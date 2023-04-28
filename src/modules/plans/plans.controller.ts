import {Body, Controller, Delete, Get, Param, Post, Put, RawBodyRequest, Req} from '@nestjs/common';
import {ApiBody, ApiHeader, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PlansService} from "./plans.service";
import {emptyResponse, xAuthorization} from "../main.swagger";
import {RequestType, uuId} from "../main.dto";
import {plan, planSubscribeToggle} from "./plans.dto";
import {
  createPlanBody,
  createPlanResponse,
  getPlanResponse,
  subscribeBody,
  subscribeResponse,
  subscribeToggleBody
} from "./plans.swagger";
import {PaymentMethodService} from "../payment_method/payment_methods.service";
import {catchError, response} from "../../utils/helpers";
import messages from "../../utils/messages";

@ApiTags('Plans')
@ApiHeader(xAuthorization)
@Controller('plan')
export class PlansController {
  constructor(
    private readonly planService: PlansService,
    private readonly paymentMethodService: PaymentMethodService,
  ) {}
  @Post('/')
  @ApiResponse(createPlanResponse)
  @ApiBody(createPlanBody)
  async create(@Req() req: RequestType, @Body() body: plan){
    try {
      const data = await this.planService.create(body);
      response({
        message: messages.PLAN_CREATED,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/')
  @ApiResponse(getPlanResponse)
  async getList(@Req() req: RequestType){
    try {
      const data = await this.planService.getList();
      return response({
        message: messages.PLAN_LIST,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/connected')
  @ApiResponse(createPlanResponse)
  async connectedPlans(@Req() req: RequestType){
    try {
      const {id} = req.user;
      const data = await this.planService.connectedPlans(id);
      return response({
        message: messages.PLAN_CONNECTED_LIST,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Get('/:id')
  @ApiResponse(createPlanResponse)
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  async getById(@Req() req: RequestType, @Param() param: uuId){
    try {
      const {id} = param;
      const data = await this.planService.getById(id);
      return response({
        message: messages.PLAN_GET,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Put('/:id')
  @ApiResponse(createPlanResponse)
  @ApiBody(createPlanBody)
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  async update(@Req() req: RequestType, @Param() param: uuId, @Body() body: plan){
    try {
      const {id} = param;
      const data = await this.planService.update(id, body);
      return response({
        message: messages.PLAN_UPDATED,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/:id')
  @ApiResponse(createPlanResponse)
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  async destroy(@Req() req: RequestType, @Param() param: uuId){
    try {
      const {id} = param;
      const data = await this.planService.destroy(id);
      return response({
        message: messages.PLAN_REMOVED,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Post('/subscribe/:id')//plan_id
  @ApiBody(subscribeBody)
  @ApiResponse(subscribeResponse)
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  async subscribe(@Req() req: RequestType, @Body() body: uuId, @Param() param: uuId){
    try {
      const {id: user_id, name, email} = req.user;
      const {id: plan_id} = param;
      const {id: payment_method_id} = body;
      const {customer_id: customer} = await this.paymentMethodService.getCustomer({name, email});
      const {pm_id} = await this.paymentMethodService.getById(user_id, payment_method_id);
      const data = await this.planService.subscribe({user_id, customer, plan_id, pm_id});
      return response({
        message: messages.PLAN_SUBSCRIBE,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Post('/subscribe-toggle/:id')//plan_id
  @ApiBody(subscribeToggleBody)
  @ApiResponse(emptyResponse('Subscription toggle'))
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  async subscribeToggle(@Req() req: RequestType, @Body() body: planSubscribeToggle, @Param() param: uuId){
    try {
      const {id: user_id} = req.user;
      const {id: plan_id} = param;
      const {cancel_at} = body;
      await this.planService.subscribeToggle({user_id, plan_id, cancel_at});
      return response({
        message: `Plan has been ${cancel_at ? 'subscribe' : 'unsubscribe'} successfully`,
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete('/subscribe-delete/:id')//plan_id
  @ApiResponse(createPlanResponse)
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  async subscribeDelete(@Req() req: RequestType, @Param() param: uuId){
    try {
      const {id: user_id} = req.user;
      const {id: plan_id} = param;
      const data = await this.planService.subscribeDelete({user_id, plan_id});
      return response({
        message: messages.PLAN_DISCONNECT,
        data
      })
    } catch (e) {
      return catchError(e);
    }
  }

  @Post('/webhook')
  async webhook(@Req() req: RawBodyRequest<Request>) {
    await this.planService.webhook(req)
  }

}
