import { Schema, Document } from 'mongoose';
import { Film, Schedule } from './dto/films.dto';

export interface ScheduleSubdocument {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface FilmDocument extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ScheduleSubdocument[];
}

const ScheduleSchema = new Schema<ScheduleSubdocument>(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: Number, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], default: [] },
  },
  { _id: false },
);

export const FilmSchema = new Schema<FilmDocument>({
  id: { type: String, required: true, unique: true },
  rating: { type: Number },
  director: { type: String },
  tags: { type: [String], default: [] },
  image: { type: String },
  cover: { type: String },
  title: { type: String },
  about: { type: String },
  description: { type: String },
  schedule: { type: [ScheduleSchema], default: [] },
});

export function toFilmDto(doc: FilmDocument): Film {
  return {
    id: doc.id,
    rating: doc.rating,
    director: doc.director,
    tags: doc.tags,
    image: doc.image,
    cover: doc.cover,
    title: doc.title,
    about: doc.about,
    description: doc.description,
  };
}

export function toScheduleDto(subdoc: ScheduleSubdocument): Schedule {
  return {
    id: subdoc.id,
    daytime: subdoc.daytime,
    hall: subdoc.hall,
    rows: subdoc.rows,
    seats: subdoc.seats,
    price: subdoc.price,
    taken: subdoc.taken,
  };
}
