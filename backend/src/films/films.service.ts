import { Inject, Injectable } from '@nestjs/common';
import {
  FILMS_REPOSITORY,
  IFilmsRepository,
} from '../repository/films.repository';
import { GetFilmDto } from './dto/get-film.dto';
import { GetScheduleDto } from './dto/get-schedule.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: IFilmsRepository,
  ) {}

  async findAll(): Promise<GetFilmDto[]> {
    return this.filmsRepository.findAll();
  }

  async findSchedule(filmId: string): Promise<GetScheduleDto[]> {
    return this.filmsRepository.findSchedule(filmId);
  }
}
