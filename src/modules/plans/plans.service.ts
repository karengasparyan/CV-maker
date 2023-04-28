import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import Stripe from "stripe";
import {InjectSqlModel} from "src/database/inject-model-sql";
import {plans} from "./plans.model";
import {users_plans} from "./users_plans.model";
import {users} from "../users/users.model";
import {subscriptions} from "./subscriptions.model";
import {STRIPE_CLIENT, STRIPE_CURRENCY, PAYMENT_METHOD_TYPE, INTERVAL} from "../../utils/constanst";
import messages from "../../utils/messages";
const {STRIPE_WEBHOOK_REVEAL} = process.env;

@Injectable()
export class PlansService {
  constructor(
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    @InjectSqlModel(plans) private Plans: typeof plans,
    @InjectSqlModel(users_plans) private UsersPlans: typeof users_plans,
    @InjectSqlModel(users) private Users: typeof users,
    @InjectSqlModel(subscriptions) private Subscriptions: typeof subscriptions,
  ) {
  }

  async create(data) {
    try {
      const {name, price: unit_amount} = data;
      const {id: product} = await this.stripe.products.create({name});
      const {id} = await this.stripe.prices.create({
        unit_amount,
        currency: STRIPE_CURRENCY,
        recurring: {interval: INTERVAL},
        product,
      });
      data.price_id = id;
      data.product_id = product;
      return this.Plans.create(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getById(id) {
    const data = await this.Plans.findByPk(id);
    if (!data) throw new HttpException(messages.PLAN_NOT_FOUND, HttpStatus.NOT_FOUND)
    return data;
  }

  async getList() {
    try {
      return this.Plans.findAll();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id, dataUpdate) {
    try {
      const {name, price: unit_amount} = dataUpdate;
      const {name: oldName, price: oldPrice, product_id: product} = await this.getById(id);

      if (name.toLowerCase() !== oldName) {
        await this.stripe.products.update(product, {name});
      }

      if (+unit_amount !== +oldPrice) {
        const {id} = await this.stripe.prices.create({
          unit_amount,
          currency: STRIPE_CURRENCY,
          recurring: {interval: INTERVAL},
          product,
        });
        dataUpdate.price_id = id;
      }

      await this.Plans.update(dataUpdate, {where: {id}});
      return this.getById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async destroy(id) {
    try {
      const data = await this.getById(id);
      await this.stripe.products.del(data?.product_id);
      await this.Plans.destroy({where: {id}});
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async connectUserToPlan(event) {
    const {subscription} = event.data.object;
    const {user_id, plan_id} = await this.getPlanBySubscription(subscription);
    return this.UsersPlans.create({user_id, plan_id});
  }

  async checkUserPlan(data) {
    const check = await this.UsersPlans.findOne({where: data});
    if (check) throw new HttpException(messages.PLAN_ALREADY_USE, HttpStatus.BAD_REQUEST);
    return false;
  }

  async connectedPlans(user_id) {
    return this.UsersPlans.findAll({
      where: {user_id},
      attributes: {exclude: ['user_id', 'plan_id']},
      include: [
        {
          model: plans,
          attributes: {exclude: ['user_id', 'plan_id']},
        }
      ]
    });
  }

  async subscribe({user_id, customer, plan_id, pm_id: payment_method}) {
    try {
      await this.checkUserPlan({user_id, plan_id});
      const {price_id: price, price: amount} = await this.getById(plan_id);
      const sub = await this.stripe.subscriptions.create({
        customer,
        items: [{price}],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent']
      });

      await this.Subscriptions.create({
        user_id,
        plan_id,
        sub_id: sub.id,
        expired: new Date(sub.current_period_end * 1000),
        status: sub.status,
        discount: sub?.discount?.coupon?.percent_off || null,
        cancel_at: sub.cancel_at_period_end
      })

      const {id} = await this.stripe.paymentIntents.create({
        customer,
        payment_method,
        amount: +(amount + '0'),
        currency: STRIPE_CURRENCY,
        payment_method_types: [PAYMENT_METHOD_TYPE],
      });

      await this.stripe.paymentIntents.confirm(id, {payment_method});

      return {
        cus_id: customer,
        pm_id: payment_method,
        sub_id: sub.id,
        pi_id: id
      }

    } catch (e) {
      throw new HttpException(`${e.name}: ${e.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async subscribeToggle({user_id, plan_id, cancel_at}) {
    try {
      const sub = await this.getSubscriptionByPlanId(user_id, plan_id);
      await this.stripe.subscriptions.update(sub.sub_id, {cancel_at_period_end: cancel_at});
      await this.Subscriptions.update({cancel_at},{where: {plan_id}});
      return sub;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async webhook(req){
    console.info('-------webhook-------')
    try {
      const event = await this.stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        STRIPE_WEBHOOK_REVEAL
      );

      switch(event.type) {
        case 'invoice.payment_succeeded': return await this.connectUserToPlan(event);
        case 'invoice.payment_failed': return;
        default: return
      }

    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async subscribeDelete(data) {
    try {
      await this.UsersPlans.destroy({where: data});
      const sub = await this.Subscriptions.findOne({where: data});
      await this.stripe.subscriptions.del(sub?.sub_id);
      await this.Subscriptions.destroy({where: data});
      return sub;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getPlanBySubscription(sub_id) {
    const plan = await this.Subscriptions.findOne({
      where: {sub_id},
      attributes: ['user_id', 'plan_id']
    })
    if (!plan) throw new HttpException(messages.PLAN_NOT_FOUND, HttpStatus.NOT_FOUND);
    return plan
  }
  async getSubscriptionByPlanId(user_id, plan_id) {
    const sub = await this.Subscriptions.findOne({where: {user_id, plan_id}})
    if (!sub) throw new HttpException(messages.SUBSCRIPTION_NOT_FOUND, HttpStatus.NOT_FOUND);
    return sub;
  }

}
