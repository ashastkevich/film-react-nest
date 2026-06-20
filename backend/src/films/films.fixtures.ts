import { FilmListResponse } from './dto/get-film.dto';
import { ScheduleListResponse } from './dto/get-schedule.dto';

const mockFilmsResponse: FilmListResponse = {
  total: 1,
  items: [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      rating: 8.5,
      director: 'Test Director',
      tags: ['test', 'film'],
      title: 'Test Film',
      about: 'A test film about testing',
      description: 'A test film description',
      image: 'test-image.jpg',
      cover: 'test-cover.jpg',
    },
  ],
};

const mockScheduleResponse: ScheduleListResponse = {
  total: 1,
  items: [
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      daytime: '2024-07-01T19:00:00Z',
      hall: 1,
      rows: 10,
      seats: 20,
      price: 15.0,
      taken: ['1:2'],
    },
  ],
};

export const fixtures = {
  mockFilmsResponse,
  mockScheduleResponse,
};
