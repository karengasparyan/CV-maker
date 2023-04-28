import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { SocketConnection } from 'src/middlewares/socket.connection';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UsersModule } from './modules/users/users.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { SkillsModule } from './modules/skills/skills.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { BiosModule } from './modules/bios/bios.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { EducationsModule } from './modules/educations/educations.module';
import { PhoneNumbersModule } from './modules/phone_numbers/phone_numbers.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentMethodModule } from './modules/payment_method/payment_methods.module';
import { PlansModule } from './modules/plans/plans.module';
import Sequelize from 'src/database/initialize-sql';
import { UserCvsModule } from './modules/user_cvs/user_cvs.module';

@Module({
  imports: [
    SocketConnection,
    Sequelize.initialize(),
    UsersModule,
    AuthModule,
    AddressesModule,
    SkillsModule,
    LanguagesModule,
    BiosModule,
    CertificatesModule,
    EducationsModule,
    PhoneNumbersModule,
    PaymentMethodModule,
    PlansModule,
    UserCvsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/user/sign-in', method: RequestMethod.POST },
        { path: '/user/sign-up', method: RequestMethod.POST },
        { path: '/user/forgot-password', method: RequestMethod.POST },
        { path: '/user/accept-forgot-password', method: RequestMethod.PUT },
        { path: '/user/email-verify/:token', method: RequestMethod.GET },
        { path: '/auth/google/login', method: RequestMethod.GET },
        { path: '/auth/google/redirect', method: RequestMethod.GET },
        { path: '/plan/webhook', method: RequestMethod.POST },
        { path: '/plan/webhook', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
