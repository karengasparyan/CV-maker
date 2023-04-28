import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {skills} from "./skills.model";
import {SkillsController} from "./skills.controller";

@Module({
  imports: [SequelizeModule.forFeature([skills])],
  providers: [SkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
