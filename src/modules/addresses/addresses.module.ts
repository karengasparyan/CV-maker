import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {addresses} from "./addresses.model";
import {AddressesService} from "./addresses.service";
import {AddressesController} from "./addresses.controller";

@Module({
  imports: [SequelizeModule.forFeature([addresses])],
  providers: [AddressesService],
  controllers: [AddressesController],
  exports: [AddressesService],
})
export class AddressesModule {}
