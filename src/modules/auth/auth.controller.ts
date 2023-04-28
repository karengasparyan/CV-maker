import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../../services/GoogleGuard';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {UsersService} from "../users/users.service";
import {RequestType} from "../main.dto";
import {OAuthLoginResponse, OAuthRedirectResponse} from "../users/users.swagger";
import {response} from "../../utils/helpers";
import messages from "../../utils/messages";

@ApiTags('Google OAuth')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('google/login')
  @ApiResponse(OAuthLoginResponse)
  @UseGuards(GoogleAuthGuard)
  handleLogin() {}

  @Get('google/redirect')
  @ApiResponse(OAuthRedirectResponse)
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() req: RequestType) {
    const {id} = req.user;
    const token = this.usersService.getToken(id);
    return response({
      message: messages.AUTH_GOOGLE_REDIRECT,
      data: {token}
    });
  }

}