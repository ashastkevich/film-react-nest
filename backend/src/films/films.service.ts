import { Inject, Injectable } from '@nestjs/common';
import {
  FILMS_REPOSITORY,
  IFilmsRepository,
} from '../repository/films.repository';
import { Film, Schedule } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILMS_REPOSITORY)
    private readonly filmsRepository: IFilmsRepository,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmsRepository.findAll();
  }

  async findSchedule(filmId: string): Promise<Schedule[]> {
    return this.filmsRepository.findSchedule(filmId);
  }
}
