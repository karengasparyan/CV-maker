import * as _ from 'lodash';
import * as nodemailer from 'nodemailer';
import {HttpException, HttpStatus} from "@nestjs/common";
const {MAIL_FROM, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD} = process.env;
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  // secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});
export default class Email {
  static async send(email: string | string[], subject: string, html: string, attachments = [{path: ''}]) {
    try {
      const to = _.isArray(email) ? email.join(', ') : email;
      const data = {
        from: MAIL_FROM,
        to,
        subject,
        html,
        attachments
      }
      if (!attachments[0].path) delete data.attachments;
      return transporter.sendMail(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}