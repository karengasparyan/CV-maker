import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {plans} from "./plans.model";
import {users_plans} from "./users_plans.model";
import {users} from "../users/users.model";
import {StripeModule} from "src/services/Stripe.module";
import {PaymentMethodModule} from "../payment_method/payment_methods.module";
import {subscriptions} from "./subscriptions.model";

@Module({
  imports: [
    StripeModule.forRoot(),
    SequelizeModule.forFeature([users, plans, users_plans, subscriptions]),
    PaymentMethodModule
  ],
  controllers: [PlansController],
  providers: [PlansService]
})
export class PlansModule {}
