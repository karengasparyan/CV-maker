import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestType, uuId } from 'src/modules/main.dto';
import { phone_number } from './phone_number.dto';
import { PhoneNumbersService } from './phone_numbers.service';
import { xAuthorization } from '../main.swagger';
import {
  createPhoneNumberBody,
  createPhoneNumberResponse,
  getPhoneNumbersResponse,
} from './phone_numbers.swagger';
import {catchError, response} from '../../utils/helpers';
import messages from "../../utils/messages";
@ApiTags('Phone numbers')
@ApiHeader(xAuthorization)
@Controller('phone-number')
export class PhoneNumbersController {
  constructor(private readonly phoneNumbersService: PhoneNumbersService) {}

  @Post('/')
  @ApiResponse(createPhoneNumberResponse)
  @ApiBody(createPhoneNumberBody)
  async createPhoneNumber(@Req() req: RequestType, @Body() body: phone_number) {
    try {
      const { id } = req.user;
      const data = await this.phoneNumbersService.create(id, body);
      return response({
        message: messages.PHONE_NUMBER_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getPhoneNumbersResponse)
  async getList(@Req() req: RequestType) {
    const { id } = req.user;
    const data = await this.phoneNumbersService.getList(id);
    return response({
      message: messages.PHONE_NUMBER_LIST,
      data,
    });
  }

  @Get('/:id')
  @ApiResponse(createPhoneNumberResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.phoneNumbersService.getById(user_id, id);
      return response({
        message: messages.PHONE_NUMBER_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/:id')
  @ApiResponse(createPhoneNumberResponse)
  @ApiBody(createPhoneNumberBody)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async update(
    @Req() req: RequestType,
    @Param() param: uuId,
    @Body() body: phone_number,
  ) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.phoneNumbersService.update(user_id, id, body);
      return response({
        message: messages.PHONE_NUMBER_UPDATE,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createPhoneNumberResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.phoneNumbersService.destroy(user_id, id);
      return response({
        message: messages.PHONE_NUMBER_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
