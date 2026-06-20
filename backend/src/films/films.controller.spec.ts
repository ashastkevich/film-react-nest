import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { fixtures } from './films.fixtures';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: FilmsService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue(fixtures.mockFilmsResponse.items),
            findSchedule: jest
              .fn()
              .mockResolvedValue(fixtures.mockScheduleResponse.items),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all films', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(fixtures.mockFilmsResponse);
  });

  it('should find schedule for a film', async () => {
    const filmId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await controller.findSchedule(filmId);
    expect(result).toEqual(fixtures.mockScheduleResponse);
  });
});
