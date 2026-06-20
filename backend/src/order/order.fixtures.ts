import { OrderRequest, OrderResponse } from './dto/create-order.dto';

const mockOrderRequest: OrderRequest = {
  email: 'test@example.com',
  phone: '+1234567890',
  tickets: [
    {
      film: '123e4567-e89b-12d3-a456-426614174000',
      session: '123e4567-e89b-12d3-a456-426614174001',
      daytime: '2024-07-01T19:00:00Z',
      row: 5,
      seat: 10,
      price: 15.0,
    },
    {
      film: '123e4567-e89b-12d3-a456-426614174000',
      session: '123e4567-e89b-12d3-a456-426614174001',
      daytime: '2024-07-01T19:00:00Z',
      row: 5,
      seat: 11,
      price: 15.0,
    },
  ],
};

const mockOrderResponse: OrderResponse = {
  total: 2,
  items: [
    {
      film: '123e4567-e89b-12d3-a456-426614174000',
      session: '123e4567-e89b-12d3-a456-426614174001',
      daytime: '2024-07-01T19:00:00Z',
      row: 5,
      seat: 10,
      price: 15.0,
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
    {
      film: '123e4567-e89b-12d3-a456-426614174000',
      session: '123e4567-e89b-12d3-a456-426614174001',
      daytime: '2024-07-01T19:00:00Z',
      row: 5,
      seat: 11,
      price: 15.0,
      id: '550e8400-e29b-41d4-a716-446655440001',
    },
  ],
};

const mockSession = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  daytime: '2024-07-01T19:00:00Z',
  hall: 1,
  rows: 10,
  seats: 20,
  price: 15.0,
  taken: [],
};

export const fixtures = {
  mockOrderRequest,
  mockOrderResponse,
  mockSession,
};
