import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {STRIPE_CLIENT} from '../../utils/constanst';
import Stripe from 'stripe';
import {InjectSqlModel} from '../../database/inject-model-sql';
import {payment_methods} from './payment_methods.model';
import {users} from "../users/users.model";
import messages from "../../utils/messages";

@Injectable()
export class PaymentMethodService {
  constructor(
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    @InjectSqlModel(payment_methods)
    private PaymentMethods: typeof payment_methods,
    @InjectSqlModel(users)
    private Users: typeof users,
  ) {
  }

  async checkCustomer(data) {
    return this.Users.findOne({where: data});
  }

  async updateCustomer(customer_id, data) {
    return this.Users.update({customer_id}, {where: data});
  }

  async getCustomer(data) {
    const customerDB = await this.checkCustomer(data);
    const customer_id = customerDB.customer_id;
    const checkInStripe = await this.stripe.customers.retrieve(customer_id).catch(() => console.info('createCustomer -> ⚠-Customer not found-⚠'));
    if (customer_id && checkInStripe) return customerDB;
    const customer: Stripe.Customer = await this.stripe.customers.create(data);
    await this.updateCustomer(customer.id, data);
    customerDB.customer_id = customer.id;
    return customerDB;
  }

  async createPaymentMethod({user_id, customer, id}) {
    try {
   
      const payment_method = await this.stripe.paymentMethods.retrieve(id)
      const attached_card = await this.stripe.paymentMethods.attach(id,{customer});
      Promise.all([payment_method, attached_card])
      const exp_month = payment_method['card']['exp_month']
      const exp_year = payment_method['card']['exp_year']
      const pm_id = payment_method.id

      return this.PaymentMethods.create({
        user_id,
        exp_month,
        exp_year,
        pm_id
      });

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getList(user_id) {
    return this.PaymentMethods.findAll({where: {user_id}});
  }

  async getById(user_id, id) {
    const data = await this.PaymentMethods.findOne({where: {user_id, id}});
    if (!data)
      throw new HttpException(messages.PAYMENT_METHOD_NOT_FOUND, HttpStatus.NOT_FOUND);
    return data;
  }

  async destroy(user_id, id) {
    const data = await this.getById(user_id, id);
    if (!data)
      throw new HttpException(messages.PAYMENT_METHOD_NOT_FOUND, HttpStatus.NOT_FOUND);
    await this.PaymentMethods.destroy({where: {user_id, id}});
    return data;
  }
}
