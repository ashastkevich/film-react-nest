import { IsString, IsNumber } from 'class-validator';

export class GetFilmDto {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string[];
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  cover: string;
}

export interface FilmListResponse {
  total: number;
  items: GetFilmDto[];
}
