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
import { AddressesService } from './addresses.service';
import { RequestType, uuId } from '../main.dto';
import {
  createAddressBody,
  createAddressResponse,
  getAddressesResponse,
} from './addresses.swagger';
import { address } from './address.dto';
import { xAuthorization } from '../main.swagger';
import {catchError, response} from '../../utils/helpers';
import messages from "../../utils/messages";

@ApiTags('Addresses')
@ApiHeader(xAuthorization)
@Controller('address')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post('/')
  @ApiBody(createAddressBody)
  @ApiResponse(createAddressResponse)
  async create(@Req() req: RequestType, @Body() body: address) {
    try {
      const { id } = req.user;
      const data = await this.addressesService.create(id, body);
      return response({
        message: messages.ADDRESS_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getAddressesResponse)
  async getList(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.addressesService.getList(id);
      return response({
        message: messages.ADDRESS_GET_LIST,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createAddressResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.addressesService.getById(user_id, id);
      return response({
        message: messages.ADDRESS_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/:id')
  @ApiBody(createAddressBody)
  @ApiResponse(createAddressResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async update(
    @Req() req: RequestType,
    @Body() body: address,
    @Param() param: uuId,
  ) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.addressesService.update(user_id, id, body);
      return response({
        message: messages.ADDRESS_UPDATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createAddressResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.addressesService.destroy(user_id, id);
      return response({
        message: messages.ADDRESS_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
