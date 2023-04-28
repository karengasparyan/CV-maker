import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import * as uniq from 'uniqid';
import {users} from './users.model';
import {InjectSqlModel} from 'src/database/inject-model-sql';
const {JWT_SECRET} = process.env;
import {checkPassword, hashPassword, renderHtmlFile, writeImage} from "../../utils/helpers";
import Email from "src/services/Email";
import {Op} from "sequelize";
import {authData} from "./auth.dto";
import {STRIPE_CLIENT} from "../../utils/constanst";
import {options} from "../../utils/helpers";
import Stripe from "stripe";
import * as path from "path";
import HttpError from "../../utils/HttpError";
import {plans} from "../plans/plans.model";
import {users_plans} from "../plans/users_plans.model";
import {user_cvs} from "../user_cvs/user_cvs.model";
import messages from "../../utils/messages";
import { JwtPayload } from '../main.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectSqlModel(users) private Users: typeof users,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,

  ) {}
  async signUp(data) {
    data = {
      ...data,
      email: data.email.toLowerCase(),
      password: await hashPassword(data.password)
    }
    await this.checkEmail(data.email);
    const user = await this.Users.create(data);
    const token = this.getToken(user.id, 'verify_email');
    return this.sendVerificationEmail(data.email, token);
  }

  async signIn(data) {
    const user = await this.Users.findOne({where: {email: data.email}});
    return this.checkUser(user, data);
  }

  async checkUser(user, data) {
    if (!user?.verified_at) throw new HttpException(messages.VERIFY_YOUR_EMAIL, HttpStatus.UNPROCESSABLE_ENTITY);
    const checkUser = user ? await checkPassword(data.password, user?.getDataValue('password')) : null;
    if (!checkUser || !user) throw new HttpException(messages.INVALID_EMAIL_OR_PASSWORD, HttpStatus.UNPROCESSABLE_ENTITY);
    return user.toJSON();
  }

  getToken(id, prefix = '') {
    return JWT.sign({id}, JWT_SECRET + prefix);
  }

  async verifyToken(token, prefix = '') {
    const decoded = await JWT.verify(token, JWT_SECRET + prefix) as JwtPayload;
    return decoded?.id;
  }

  async getUserById(id) {
    const user = await this.Users.findByPk(id, {
      include: [{
        model: users_plans,
        attributes: ['id'],
        include: [
          { model: plans },
        ]
      },
        {
          model: user_cvs,
          attributes: ['id']
        },
      ]
    });
    const data = user['dataValues'];
    user.setDataValue('userCvs', data.userCvs.length);
    return data;
  }

  async update(id, data) {
    await this.Users.update(data, {where: {id}});
    return this.getUserById(id);
  }

  async updatePassword(id, data) {
    const user = await this.Users.findOne({where: {id}});
    const checkUser = user ? await checkPassword(data.oldPassword, user?.getDataValue('password')) : null;
    if (!checkUser || !user) throw new HttpException(messages.INVALID_PASSWORD, HttpStatus.UNPROCESSABLE_ENTITY);
    data.password = await hashPassword(data.password);
    return this.Users.update(data, {where: {id}})
  }

  async updatePasswordByCode(id, data) {
    data.password = await hashPassword(data.password);
    return this.Users.update(data, {where: {id}})
  }


  async checkEmail(email) {
    const check = await this.Users.findOne({where: {email}});
    if (check) throw new HttpError({
      status: HttpStatus.BAD_REQUEST,
      message: messages.BAD_REQUEST,
      messagesGroup: {email: messages.EMAIL_ALREADY_USE}
    });
    return true;
  }

  async findById(id) {
    const user = await this.Users.findByPk(id);
    if (!user) throw new HttpException(messages.INVALID_EMAIL_OR_PASSWORD, HttpStatus.UNPROCESSABLE_ENTITY);
    return user;
  }

  async sendVerificationEmail(email, token) {
    const direction = path.resolve('src','modules','emailTemplates','verification.html');
    const html = await renderHtmlFile(direction, options(email, token));
    await Email.send(email, messages.VERIFY_YOUR_EMAIL, html);
  }

  async verifyEmail(id) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException(messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (user.verified_at) throw new HttpError({
      status: HttpStatus.BAD_REQUEST,
      message: messages.BAD_REQUEST,
      messagesGroup: {email: messages.EMAIL_ALREADY_VERIFIED}
    });
    await this.Users.update({verified_at: new Date()}, {where: {id}});
    const token = this.getToken(id);
    return {token};
  }
  async sendForgotCodeToEmail(email) {
    const forgot_password_code = uniq.time();
    const user = await this.Users.findOne({where: {email}});
    if (!user) throw new HttpError({
      status: HttpStatus.NOT_FOUND,
      message: messages.BAD_REQUEST,
      messagesGroup: {email: messages.EMAIL_NOT_FOUND}
    });
    await this.Users.update({forgot_password_code}, {where: {id: user.id}})
    await this.Users.sequelize.query(`
    create event ${forgot_password_code}
     on schedule at current_timestamp + interval 5 minute
     do update users set forgot_password_code = null`);
    const html = `<h1>CV Maker</h1><div><h6>Your verification code: ${forgot_password_code}, expair 5 minute</h6></div>`;
    return Email.send(email, 'Forgot password code', html);
  }

  async acceptCodeForgotPassword(data) {
    const user = await this.Users.findOne({where: {forgot_password_code: data.code}});
    if (!user) throw new HttpError({
      status: HttpStatus.BAD_REQUEST,
      message: messages.BAD_REQUEST,
      messagesGroup: {code: messages.CODE_NOT_CORRECT}
    });
    return this.updatePasswordByCode(user.id, {password: data.password});
  }

  async uploadAvatar(id, file) {
    const data = await writeImage(id, file);
    await this.Users.update(data, {where: {id}});
    return data;
  }

  async validateGoogleUser(params: authData) {
    const {name, email, social_id, image} = params;
    const where = {email};
    const defaults = {name, email, social_id, image, verified_at: new Date()};
    const [user] = await this.Users.findOrCreate({where, defaults});
    return user['dataValues'];
  }

  async getInvoices(customer) {
    if (!customer) throw new HttpException(messages.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
    const {data} = await this.stripe.invoices.list({customer});
    return data.map(d => d.lines.data[0]);
  }

  async getSubscriptions(customer) {
    if (!customer) throw new HttpException(messages.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
    const {data} = await this.stripe.subscriptions.list({customer});
    return data.map(d => d.items.data[0]);
  }

}
