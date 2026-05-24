import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { TypeORMFilmsRepository } from '../repository/typeorm-films.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const parsed = new URL(config.get<string>('DATABASE_URL'));
        return {
          type: 'postgres',
          host: parsed.hostname,
          port: parseInt(parsed.port || '5432', 10),
          database: parsed.pathname.replace(/^\//, ''),
          username: config.get<string>('DATABASE_USERNAME'),
          password: config.get<string>('DATABASE_PASSWORD'),
          entities: [Film, Schedule],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  providers: [TypeORMFilmsRepository],
  exports: [TypeOrmModule, TypeORMFilmsRepository],
})
export class DatabaseModule {}
