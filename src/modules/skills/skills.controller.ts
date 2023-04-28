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
import { SkillsService } from './skills.service';
import { RequestType, uuId } from '../main.dto';
import { xAuthorization } from '../main.swagger';
import {
  createSkillBody,
  createSkillResponse,
  getSkillResponse,
} from './skills.swagger';
import { skill } from './skills.dto';
import {catchError, response} from '../../utils/helpers';
import messages from "../../utils/messages";

@ApiTags('Skills')
@ApiHeader(xAuthorization)
@Controller('skill')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('/')
  @ApiResponse(createSkillResponse)
  @ApiBody(createSkillBody)
  async create(@Req() req: RequestType, @Body() body: skill) {
    try {
      const { id } = req.user;
      const data = await this.skillsService.create(id, body);
      return response({
        message: messages.SKILL_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getSkillResponse)
  async getList(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.skillsService.getList(id);
      return response({
        message: messages.SKILL_LIST,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createSkillResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.skillsService.getById(user_id, id);
      return response({
        message: messages.SKILL_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/:id')
  @ApiResponse(createSkillResponse)
  @ApiBody(createSkillBody)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async update(
    @Req() req: RequestType,
    @Param() param: uuId,
    @Body() body: skill,
  ) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.skillsService.update(user_id, id, body);
      return response({
        message: messages.SKILL_UPDATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createSkillResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.skillsService.destroy(user_id, id);
      return response({
        message: messages.SKILL_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
