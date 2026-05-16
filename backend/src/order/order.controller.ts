import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRequest, OrderResponse } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: OrderRequest): Promise<OrderResponse> {
    return this.orderService.createOrder(order);
  }
}
