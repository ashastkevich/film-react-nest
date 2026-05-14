import { Model, Connection } from 'mongoose';
import { Film, Schedule } from '../films/dto/films.dto';
import {
  FilmDocument,
  FilmSchema,
  toFilmDto,
  toScheduleDto,
} from '../films/films.schema';

export interface IFilmsRepository {
  findAll(): Promise<Film[]>;
  findSchedule(filmId: string): Promise<Schedule[]>;
  findSession(filmId: string, sessionId: string): Promise<Schedule | null>;
  markSeatTaken(filmId: string, sessionId: string, seat: string): Promise<void>;
}

export const FILMS_REPOSITORY = 'FILMS_REPOSITORY';

export class MongoDBFilmsRepository implements IFilmsRepository {
  private readonly filmModel: Model<FilmDocument>;

  constructor(connection: Connection) {
    this.filmModel = connection.model<FilmDocument>(
      'Film',
      FilmSchema,
      'films',
    );
  }

  async findAll(): Promise<Film[]> {
    const docs = await this.filmModel.find().exec();
    return docs.map(toFilmDto);
  }

  async findSchedule(filmId: string): Promise<Schedule[]> {
    const doc = await this.filmModel.findOne({ id: filmId }).exec();
    if (!doc) return [];
    return doc.schedule.map(toScheduleDto);
  }

  async findSession(
    filmId: string,
    sessionId: string,
  ): Promise<Schedule | null> {
    const doc = await this.filmModel
      .findOne({ id: filmId, 'schedule.id': sessionId })
      .exec();
    if (!doc) return null;
    const subdoc = doc.schedule.find((s) => s.id === sessionId);
    return subdoc ? toScheduleDto(subdoc) : null;
  }

  async markSeatTaken(
    filmId: string,
    sessionId: string,
    seat: string,
  ): Promise<void> {
    await this.filmModel
      .updateOne(
        { id: filmId, 'schedule.id': sessionId },
        { $push: { 'schedule.$.taken': seat } },
      )
      .exec();
  }
}
