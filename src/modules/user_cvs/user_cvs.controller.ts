import {Controller, Delete, Get, Param, Post, Query, Req} from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { xAuthorization } from '../main.swagger';
import { UserCvsService } from './user_cvs.service';
import { RequestType, uuId } from '../main.dto';
import {catchError, response} from '../../utils/helpers';
import { createCvResponse, getCvResponse } from './user_cvs.swagger';
import messages from "../../utils/messages";
import {inMath} from "./user_cvs.dto";

@ApiTags('CVs')
@ApiHeader(xAuthorization)
@Controller('user-cvs')
export class UserCvsController {
  constructor(private readonly userCvsService: UserCvsService) {}

  @Post('/')
  @ApiResponse(createCvResponse)
  async create(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.userCvsService.create(id);
      return response({
        message: messages.CV_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getCvResponse)
  async getList(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.userCvsService.getList(id);
      return response({
        message: messages.CV_LIST,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/between')
  @ApiQuery({
    name: 'end',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'start',
    required: false,
    type: 'string',
  })
  @ApiResponse(createCvResponse)
  async getBetween(@Req() req: RequestType, @Query() query: inMath) {
    try {
      const { id } = req.user;
      const { start, end } = query;
      const data = await this.userCvsService.getBetween(id, start, end);
      return response({
        message: messages.CV_GET_BETWEEN,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createCvResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.userCvsService.getById(user_id, id);
      return response({
        message: messages.CV_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createCvResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.userCvsService.destroy(user_id, id);
      return response({
        message: messages.CV_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

}
