import { Module } from '@nestjs/common';
import { BiosService } from './bios.service';
import { BiosController } from './bios.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {bios} from "./bios.model";

@Module({
  imports: [SequelizeModule.forFeature([bios])],
  providers: [BiosService],
  controllers: [BiosController]
})
export class BiosModule {}
