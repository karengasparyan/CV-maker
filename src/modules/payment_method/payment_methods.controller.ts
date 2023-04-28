import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { xAuthorization } from 'src/modules/main.swagger';
import {
  createPaymentMethodResponse,
  getPaymentMethodBody,
  getPaymentMethodResponse,
} from './payment_methods.swagger';
import { PaymentMethodService } from './payment_methods.service';
import {catchError, response} from "../../utils/helpers";
import messages from "../../utils/messages";
import { payment_method } from './payment_methods.dto';

@ApiTags('Payment methods')
@ApiHeader(xAuthorization)
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodsService: PaymentMethodService) {}
  @Post('/')
  @ApiResponse(createPaymentMethodResponse)
  @ApiBody(getPaymentMethodBody)
  async create(@Req() req: RequestType,  @Body() body: payment_method) {
    try {
      const { id } = body;
      const {id: user_id, name, email} = req.user;
      const {customer_id: customer} = await this.paymentMethodsService.getCustomer({name, email});
      const data = await this.paymentMethodsService.createPaymentMethod({
        user_id,
        customer,
        id
      });
      return response({
        message: messages.PAYMENT_METHOD_CREATED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getPaymentMethodResponse)
  async getList(@Req() req: RequestType) {
    try {
      const { id } = req.user;
      const data = await this.paymentMethodsService.getList(id);
      return response({
        message: messages.PAYMENT_METHOD_LIST,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createPaymentMethodResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async getById(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.paymentMethodsService.getById(user_id, id);
      return response({
        message: messages.PAYMENT_METHOD_GET,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createPaymentMethodResponse)
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId) {
    try {
      const { id: user_id } = req.user;
      const { id } = param;
      const data = await this.paymentMethodsService.destroy(user_id, id);
      return response({
        message: messages.PAYMENT_METHOD_REMOVED,
        data,
      });
    } catch (e) {
      return catchError(e);
    }
  }
}
