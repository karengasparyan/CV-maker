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
import { CertificatesService } from './certificates.service';
import { xAuthorization } from '../main.swagger';
import { RequestType, uuId } from '../main.dto';
import {
  createCertificateResponse,
  createCertificateBody,
  getCertificateResponse,
} from './certificates.swagger';
import { certificates } from './certificates.dto';
import { skill } from '../skills/skills.dto';
import {catchError, response} from '../../utils/helpers';
import messages from "../../utils/messages";

@ApiTags('Certificates')
@ApiHeader(xAuthorization)
@Controller('certificate')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post('/')
  @ApiResponse(createCertificateResponse)
  @ApiBody(createCertificateBody)
  async create(@Req() req: RequestType, @Body() body: certificates) {
    try {
      const { id } = req.user;
      const data = await this.certificatesService.create(id, body);
      return response({
        message: messages.CERTIFICATE_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getCertificateResponse)
  async getList(@Req() req: RequestType) {
    const { id } = req.user;
    const data = await this.certificatesService.getList(id);
    return response({
      message: messages.CERTIFICATE_LIST,
      data,
    });
  }

  @Get('/:id')
  @ApiResponse(createCertificateResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.certificatesService.getById(user_id, id);
      return response({
        message: messages.CERTIFICATE_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
  @Put('/:id')
  @ApiResponse(createCertificateResponse)
  @ApiBody(createCertificateBody)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async update(
    @Req() req: RequestType,
    @Param() param: uuId,
    @Body() body: certificates,
  ) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.certificatesService.update(user_id, id, body);
      return response({
        message: messages.CERTIFICATES_UPDATE,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createCertificateResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.certificatesService.destroy(user_id, id);
      return response({
        message: messages.CERTIFICATE_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
