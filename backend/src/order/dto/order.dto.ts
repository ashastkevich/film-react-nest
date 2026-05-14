export interface TicketRequest {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export interface OrderRequest {
  email: string;
  phone: string;
  tickets: TicketRequest[];
}

export interface TicketResponse extends TicketRequest {
  id: string;
}

export interface OrderResponse {
  total: number;
  items: TicketResponse[];
}
