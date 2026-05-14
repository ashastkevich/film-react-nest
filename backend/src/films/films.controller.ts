import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmListResponse, ScheduleListResponse } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<FilmListResponse> {
    const items = await this.filmsService.findAll();
    return { total: items.length, items };
  }

  @Get(':id/schedule')
  async findSchedule(@Param('id') id: string): Promise<ScheduleListResponse> {
    const items = await this.filmsService.findSchedule(id);
    return { total: items.length, items };
  }
}
