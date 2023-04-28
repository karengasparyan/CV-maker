import { Module } from '@nestjs/common';
import { EducationsController } from './educations.controller';
import { EducationsService } from './educations.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {educations} from "./educations.model";
@Module({
  imports: [SequelizeModule.forFeature([educations])],
  controllers: [EducationsController],
  providers: [EducationsService]
})
export class EducationsModule {}
