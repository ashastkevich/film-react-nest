import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

import { AppConfig, configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import {
  FILMS_REPOSITORY,
  MongoDBFilmsRepository,
} from './repository/films.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    OrderService,
    {
      provide: FILMS_REPOSITORY,
      useFactory: async (config: AppConfig) => {
        const connection = await mongoose
          .createConnection(config.database.url)
          .asPromise();
        return new MongoDBFilmsRepository(connection);
      },
      inject: ['CONFIG'],
    },
  ],
})
export class AppModule {}
