import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {languages} from "./languages.model";
import {LanguagesController} from "./languages.controller";

@Module({
  imports: [SequelizeModule.forFeature([languages])],
  providers: [LanguagesService],
  controllers: [LanguagesController]
})
export class LanguagesModule {}
