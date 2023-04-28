import {DynamicModule, Module, Provider} from "@nestjs/common";
import {Stripe} from "stripe";
import {STRIPE_CLIENT} from "../utils/constanst";
const {STRIPE_SECRET_KEY} = process.env;

@Module({})
export class StripeModule {
  static forRoot(): DynamicModule {
    const stripe = new Stripe(STRIPE_SECRET_KEY, {apiVersion: '2022-11-15'})
    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe
    }
    return {
      module: StripeModule,
      providers: [stripeProvider],
      exports: [stripeProvider],
      global: true
    }
  }
}