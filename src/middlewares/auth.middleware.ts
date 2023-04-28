import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import {RequestType, response, next, } from '../modules/main.dto';
import {UsersService} from "../modules/users/users.service";
import messages from "../utils/messages";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: RequestType, res: response, next: next) {
    try {
      const token = req.headers['x-authorization'];
      if (token) {
        const id = await this.usersService.verifyToken(token);
        if (!id) next(new HttpException(messages.FORBIDDEN, HttpStatus.FORBIDDEN));
        const user = await this.usersService.findById(id);
        if (!user) next(new HttpException(messages.FORBIDDEN, HttpStatus.FORBIDDEN));
        req.user = user['dataValues'];
        return next();
      }
      if (req.user) {
        return next();
      }
      next(new HttpException('Forbidden', HttpStatus.FORBIDDEN));
    } catch (e) {
      return next(new HttpException(`${e.name} ${e.message}`, HttpStatus.FORBIDDEN));
    }
  }
}
