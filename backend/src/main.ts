import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public', 'content', 'afisha'), {
    prefix: '/content/afisha',
  });
  const loggerType = process.env.LOG_FORMAT ?? 'dev';
  if (loggerType === 'json') app.useLogger(new JsonLogger());
  else if (loggerType === 'tskv') app.useLogger(new TskvLogger());
  else app.useLogger(new DevLogger());

  await app.listen(3000);
}
bootstrap();
