import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {certificates} from "./certificates.model"

@Module({
  imports: [SequelizeModule.forFeature([certificates])],
  providers: [CertificatesService],
  controllers: [CertificatesController]
})
export class CertificatesModule {}
