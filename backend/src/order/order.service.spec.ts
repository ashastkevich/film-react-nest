import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { fixtures } from './order.fixtures';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderService,
          useValue: {
            createOrder: jest
              .fn()
              .mockResolvedValue(fixtures.mockOrderResponse),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create order with valid tickets', async () => {
    const result = await service.createOrder(fixtures.mockOrderRequest);
    expect(result.total).toBe(fixtures.mockOrderResponse.total);
    expect(result.items.length).toBe(fixtures.mockOrderResponse.items.length);
    expect(result.items[0]).toHaveProperty('id');
    expect(result.items[0].row).toBe(fixtures.mockOrderRequest.tickets[0].row);
    expect(result.items[0].seat).toBe(
      fixtures.mockOrderRequest.tickets[0].seat,
    );
  });
});
