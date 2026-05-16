import { IsString, IsNumber } from 'class-validator';

export class GetScheduleDto {
  @IsString()
  id: string;
  @IsString()
  daytime: string;
  @IsNumber()
  hall: number;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  taken: string[];
}

export interface ScheduleListResponse {
  total: number;
  items: GetScheduleDto[];
}
