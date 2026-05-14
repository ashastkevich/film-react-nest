export interface Film {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

export interface Schedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface FilmListResponse {
  total: number;
  items: Film[];
}

export interface ScheduleListResponse {
  total: number;
  items: Schedule[];
}
