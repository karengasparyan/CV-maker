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
import { LanguagesService } from './languages.service';
import { xAuthorization } from '../main.swagger';
import { RequestType, uuId } from '../main.dto';
import {
  createLanguageBody,
  createLanguageResponse,
  getLanguageResponse,
} from './languages.swagger';
import { language } from './languages.dto';
import {catchError, response} from '../../utils/helpers';
import messages from "../../utils/messages";

@ApiTags('Languages')
@ApiHeader(xAuthorization)
@Controller('language')
export class LanguagesController {
  constructor(private readonly languageService: LanguagesService) {}

  @Post('/')
  @ApiResponse(createLanguageResponse)
  @ApiBody(createLanguageBody)
  async create(@Req() req: RequestType, @Body() body: language) {
    try {
      const { id } = req.user;
      const data = await this.languageService.create(id, body);
      return response({
        message: messages.LANGUAGE_CREATE,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getLanguageResponse)
  async getList(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.languageService.getList(id);
      return response({
        message: messages.LANGUAGE_LIST,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createLanguageResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.languageService.getById(user_id, id);
      return response({
        message: messages.LANGUAGE_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/:id')
  @ApiResponse(createLanguageResponse)
  @ApiBody(createLanguageBody)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async update(
    @Req() req: RequestType,
    @Param() param: uuId,
    @Body() body: language,
  ) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.languageService.update(user_id, id, body);
      return response({
        message: messages.LANGUAGE_UPDATE,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createLanguageResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.languageService.destroy(user_id, id);
      return response({
        message: messages.LANGUAGE_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
