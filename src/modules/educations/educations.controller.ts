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
import { EducationsService } from './educations.service';
import { xAuthorization } from '../main.swagger';
import { RequestType, uuId } from '../main.dto';
import {
  createEducationBody,
  createEducationResponse,
  getEducationResponse,
} from './educations.swagger';
import { educations } from './educations.dto';
import {catchError, response} from '../../utils/helpers';
import messages from "../../utils/messages";

@ApiTags('Educations')
@ApiHeader(xAuthorization)
@Controller('education')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Post('/')
  @ApiResponse(createEducationResponse)
  @ApiBody(createEducationBody)
  async create(@Req() req: RequestType, @Body() body: educations) {
    try {
      const { id } = req.user;
      const data = await this.educationsService.create(id, body);
      return response({
        message: messages.EDUCTION_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getEducationResponse)
  async getList(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.educationsService.getList(id);
      return response({
        message: messages.EDUCTION_LIST,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createEducationResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.educationsService.getById(user_id, id);
      return response({
        message: messages.EDUCTION_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
  @Put('/:id')
  @ApiResponse(createEducationResponse)
  @ApiBody(createEducationBody)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async update(
    @Req() req: RequestType,
    @Param() param: uuId,
    @Body() body: educations,
  ) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.educationsService.update(user_id, id, body);
      return response({
        message: messages.EDUCTION_UPDATE,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createEducationResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.educationsService.destroy(user_id, id);
      return response({
        message: messages.EDUCTION_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
