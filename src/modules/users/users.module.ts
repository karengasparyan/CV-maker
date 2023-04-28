import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from './users.model';
import {StripeModule} from "src/services/Stripe.module";

@Module({
  imports: [
    StripeModule.forRoot(),
    SequelizeModule.forFeature([users])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
