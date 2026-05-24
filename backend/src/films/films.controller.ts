import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmListResponse } from './dto/get-film.dto';
import { ScheduleListResponse } from './dto/get-schedule.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<FilmListResponse> {
    const items = await this.filmsService.findAll();
    return { total: items.length, items };
  }

  @Get(':id/schedule')
  async findSchedule(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ScheduleListResponse> {
    const items = await this.filmsService.findSchedule(id);
    return { total: items.length, items };
  }
}
