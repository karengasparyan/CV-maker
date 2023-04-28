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
import { xAuthorization } from '../main.swagger';
import { RequestType, uuId } from '../main.dto';
import { BiosService } from './bios.service';
import { bio } from './bios.dto';
import {
  createBioBody,
  createBioResponse,
  getBioResponse,
} from './bios.swagger';
import {catchError, response} from '../../utils/helpers';
import messages from "../../utils/messages";

@ApiTags('Bios')
@ApiHeader(xAuthorization)
@Controller('bios')

export class BiosController {
  constructor(private readonly biosService: BiosService) {}

  @Post('/')
  @ApiResponse(createBioResponse)
  @ApiBody(createBioBody)
  async create(@Req() req: RequestType, @Body() body: bio) {
    try {
      const { id } = req.user;
      const data = await this.biosService.create(id, body);
      return response({
        message: messages.BIO_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getBioResponse)
  async getList(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.biosService.getList(id);
      return response({
        message: messages.BIO_LIST,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createBioResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.biosService.getById(user_id, id);
      return response({
        message: messages.BIO_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/:id')
  @ApiResponse(createBioResponse)
  @ApiBody(createBioBody)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async update(
    @Req() req: RequestType,
    @Param() param: uuId,
    @Body() body: bio,
  ) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.biosService.update(user_id, id, body);
      return response({
        message: messages.BIO_UPDATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createBioResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.biosService.destroy(user_id, id);
      return response({
        message: messages.BIO_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
