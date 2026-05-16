import { Model, Connection } from 'mongoose';
import { GetFilmDto } from '../films/dto/get-film.dto';
import {
  FilmDocument,
  FilmSchema,
  toFilmDto,
  toScheduleDto,
} from '../films/films.schema';
import { GetScheduleDto } from 'src/films/dto/get-schedule.dto';

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

export class MongoDBFilmsRepository implements IFilmsRepository {
  private readonly filmModel: Model<FilmDocument>;

  constructor(connection: Connection) {
    this.filmModel = connection.model<FilmDocument>(
      'Film',
      FilmSchema,
      'films',
    );
  }

  async findAll(): Promise<GetFilmDto[]> {
    const docs = await this.filmModel.find().exec();
    return docs.map(toFilmDto);
  }

  async findSchedule(filmId: string): Promise<GetScheduleDto[]> {
    const doc = await this.filmModel.findOne({ id: filmId }).exec();
    return doc.schedule.map(toScheduleDto);
  }

  async findSession(
    filmId: string,
    sessionId: string,
  ): Promise<GetScheduleDto | null> {
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
