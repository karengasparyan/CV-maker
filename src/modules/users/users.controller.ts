import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UsersService} from './users.service';

import {
  acceptCodeForgotPassword,
  forgotPassword,
  UpdateDto,
  updatePassword,
  UserDto,
  UserLoginDto
} from './user.dto';
import {
  acceptCodeForgotPasswordBody,
  forgotPasswordBody,
  getMeResponse, invoicesResponse,
  signInBody,
  signInResponse,
  signUpBody, subscriptionsResponse,
  updateBody, updatePasswordBody,
  updateResponse, uploadAvatarBody, uploadAvatarResponse, verifyUserResponse
} from "./users.swagger";
import {RequestType} from "../main.dto";
import {emptyResponse, xAuthorization} from "../main.swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {catchError, response} from "../../utils/helpers";
import messages from "../../utils/messages";

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  @ApiBody(signUpBody)
  @ApiResponse(emptyResponse('User response'))
  async signUp(@Body() body: UserDto) {
    try {
      const data = await this.usersService.signUp(body);
      return response({
        message: messages.VERIFICATION,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Post('/sign-in')
  @ApiBody(signInBody)
  @ApiResponse(signInResponse)
  async signIn(@Body() body: UserLoginDto) {
    try {
      const data = await this.usersService.signIn(body);
      const token = this.usersService.getToken(data.id);
      return response({
        message: messages.LOGIN,
        data: {...data, token}
      });
    } catch (e){
      return catchError(e);
    }
  }

  @Get('/me')
  @ApiHeader(xAuthorization)
  @ApiResponse(getMeResponse)
  async getMe(@Req() req: RequestType) {
    try {
      const {id} = req.user;
      const data = await this.usersService.getUserById(id);
      return response({
        message: messages.CURRENT_USER,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/')
  @ApiBody(updateBody)
  @ApiResponse(updateResponse)
  @ApiHeader(xAuthorization)
  async update(@Req() req: RequestType, @Body() body: UpdateDto) {
    try {
      const {id} = req.user;
      const data = await this.usersService.update(id, body);
      return response({
        message: messages.USER_UPDATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/password')
  @ApiBody(updatePasswordBody)
  @ApiResponse(emptyResponse('User response'))
  @ApiHeader(xAuthorization)
  async updatePassword(@Req() req: RequestType, @Body() body: updatePassword) {
    try {
      const {id} = req.user;
      await this.usersService.updatePassword(id, body);
      return response({
        message: messages.PASSWORD_UPDATED,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/email-verify/:token')
  @ApiParam({
    name: 'token',
    type: 'string'
  })
  @ApiResponse(verifyUserResponse)
  async verifyUser(@Param('token') token: string) {
    try {
      const id = await this.usersService.verifyToken(token, 'verify_email');
      const data = await this.usersService.verifyEmail(id);
      return response({
        message: messages.USER_VERIFIED,
        data
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Post('/forgot-password')
  @ApiBody(forgotPasswordBody)
  @ApiResponse(emptyResponse('User response'))
  async forgotPassword(@Body() body: forgotPassword) {
    try {
      await this.usersService.sendForgotCodeToEmail(body.email);
      return response({
        message: messages.VERIFICATION_CODE_SENT,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/accept-forgot-password')
  @ApiBody(acceptCodeForgotPasswordBody)
  @ApiResponse(emptyResponse('User response'))
  async acceptCodeForgotPassword(@Req() req: RequestType, @Body() body: acceptCodeForgotPassword) {
    try {
      await this.usersService.acceptCodeForgotPassword(body);
      return response({
        message: messages.PASSWORD_CHANGED,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @ApiHeader(xAuthorization)
  @ApiConsumes("multipart/form-data")
  @ApiBody(uploadAvatarBody)
  @ApiResponse(uploadAvatarResponse)
  @Post('/avatar')
  // @UseInterceptors(AnyFilesInterceptor())
  // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   console.log(files);
  // }
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Req() req: RequestType, @UploadedFile() file: Express.Multer.File) {
    try {
      const {id} = req.user;
      const data = await this.usersService.uploadAvatar(id, file);
      return response({
        message: messages.AVATAR_UPLOADED,
        data
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/invoices')
  @ApiHeader(xAuthorization)
  @ApiResponse(invoicesResponse)
  async getInvoices(@Req() req: RequestType) {
    try {
      const {customer_id} = req.user;
      const data = await this.usersService.getInvoices(customer_id);
      return response({
        message: messages.INVOICES_LIST,
        data
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/subscriptions')
  @ApiHeader(xAuthorization)
  @ApiResponse(subscriptionsResponse)
  async getSubscriptions(@Req() req: RequestType) {
    try {
      const {customer_id} = req.user;
      const data = await this.usersService.getSubscriptions(customer_id);
      return response({
        message: messages.SUBSCRIPTIONS_LIST,
        data
      });
    } catch (e) {
      return catchError(e);
    }
  }

}
