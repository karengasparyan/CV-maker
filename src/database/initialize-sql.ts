import { SequelizeModule } from '@nestjs/sequelize';
import { users } from '../modules/users/users.model';
import { addresses } from '../modules/addresses/addresses.model';
import {skills} from "../modules/skills/skills.model";
import {languages} from "../modules/languages/languages.model";
import {bios} from "../modules/bios/bios.model";
import {certificates} from "../modules/certificates/certificates.model";
import {educations} from "../modules/educations/educations.model";
import { phone_numbers } from '../modules/phone_numbers/phone_numbers.model';
import {payment_methods} from "../modules/payment_method/payment_methods.model";
import {plans} from "../modules/plans/plans.model";
import {users_plans} from "../modules/plans/users_plans.model";
import {subscriptions} from "../modules/plans/subscriptions.model";
import { user_cvs } from '../modules/user_cvs/user_cvs.model';
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

export default class Sequelize {
  static initialize() {
    return SequelizeModule.forRoot({
      dialect: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false
      },
      models: [
        users,
        addresses,
        skills,
        languages,
        bios,
        certificates,
        educations,
        phone_numbers,
        payment_methods,
        plans,
        users_plans,
        subscriptions,
        user_cvs
      ],
    });
  }
}
