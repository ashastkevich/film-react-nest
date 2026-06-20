import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { fixtures } from './films.fixtures';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(fixtures.mockFilmsResponse),
            findSchedule: jest
              .fn()
              .mockResolvedValue(fixtures.mockScheduleResponse),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find all films', async () => {
    const result = await service.findAll();
    expect(result).toEqual(fixtures.mockFilmsResponse);
  });

  it('should find schedule for a film', async () => {
    const filmId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await service.findSchedule(filmId);
    expect(result).toEqual(fixtures.mockScheduleResponse);
  });
});
