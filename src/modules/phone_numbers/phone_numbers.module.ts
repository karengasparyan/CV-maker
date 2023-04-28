import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PhoneNumbersController } from './phone_numbers.controller';
import { phone_numbers } from './phone_numbers.model';
import { PhoneNumbersService } from './phone_numbers.service';

@Module({
  imports: [SequelizeModule.forFeature([phone_numbers])],
  providers: [PhoneNumbersService],
  controllers: [PhoneNumbersController],
  exports: [PhoneNumbersService]
})
export class PhoneNumbersModule {}
