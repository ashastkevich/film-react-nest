import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export interface OrderRequest {
  email: string;
  phone: string;
  tickets: CreateOrderDto[];
}

export interface TicketResponse extends CreateOrderDto {
  id: string;
}

export interface OrderResponse {
  total: number;
  items: TicketResponse[];
}
