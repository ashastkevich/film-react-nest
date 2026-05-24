import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { IFilmsRepository } from './films.repository';
import { GetFilmDto } from '../films/dto/get-film.dto';
import { GetScheduleDto } from '../films/dto/get-schedule.dto';

@Injectable()
export class TypeORMFilmsRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll(): Promise<GetFilmDto[]> {
    const films = await this.filmRepo.find();
    return films.map((f) => ({
      id: f.id,
      rating: f.rating,
      director: f.director,
      tags: f.tags,
      title: f.title,
      about: f.about,
      description: f.description,
      image: f.image,
      cover: f.cover,
    }));
  }

  async findSchedule(filmId: string): Promise<GetScheduleDto[]> {
    const rows = await this.scheduleRepo.findBy({ filmId });
    return rows.map((s) => this.toDto(s));
  }

  async findSession(
    filmId: string,
    sessionId: string,
  ): Promise<GetScheduleDto | null> {
    const s = await this.scheduleRepo.findOneBy({ id: sessionId, filmId });
    return s ? this.toDto(s) : null;
  }

  async markSeatTaken(
    filmId: string,
    sessionId: string,
    seat: string,
  ): Promise<void> {
    const s = await this.scheduleRepo.findOneBy({ id: sessionId, filmId });
    if (!s) return;
    await this.scheduleRepo.update(sessionId, { taken: [...s.taken, seat] });
  }

  private toDto(s: Schedule): GetScheduleDto {
    return {
      id: s.id,
      daytime: s.daytime,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken,
    };
  }
}
