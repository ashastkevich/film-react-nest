import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configProvider } from './app.config.provider';
import { DatabaseModule } from './database/database.module';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FILMS_REPOSITORY } from './repository/films.repository';
import { TypeORMFilmsRepository } from './repository/typeorm-films.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    OrderService,
    {
      provide: FILMS_REPOSITORY,
      useExisting: TypeORMFilmsRepository,
    },
  ],
})
export class AppModule {}
