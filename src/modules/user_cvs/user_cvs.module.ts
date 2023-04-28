import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCvsController } from './user_cvs.controller';
import { user_cvs } from './user_cvs.model';
import { UserCvsService } from './user_cvs.service';

@Module({
  imports: [SequelizeModule.forFeature([user_cvs])],
  controllers: [UserCvsController],
  providers: [UserCvsService]
})
export class UserCvsModule {}
