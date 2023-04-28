import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from '../../services/GoogleStrategy';
import { SessionSerializer } from '../../services/PassportSerializer';
import {SequelizeModule} from "@nestjs/sequelize";
import {users} from "../users/users.model";
import { UsersService } from '../users/users.service';

@Module({
  imports: [SequelizeModule.forFeature([users])],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    UsersService,
  ],
})
export class AuthModule {}