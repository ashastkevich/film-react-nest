import { GetFilmDto } from '../films/dto/get-film.dto';
import { GetScheduleDto } from '../films/dto/get-schedule.dto';

export interface IFilmsRepository {
  findAll(): Promise<GetFilmDto[]>;
  findSchedule(filmId: string): Promise<GetScheduleDto[]>;
  findSession(
    filmId: string,
    sessionId: string,
  ): Promise<GetScheduleDto | null>;
  markSeatTaken(filmId: string, sessionId: string, seat: string): Promise<void>;
}

export const FILMS_REPOSITORY = 'FILMS_REPOSITORY';
