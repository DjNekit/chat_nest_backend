import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true
  });
  app.enableVersioning();
  app.use(logger);
  app.use(cookieParser());
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    disableErrorMessages: process.env.NODE_ENV === 'production'
  }));

  const config = new DocumentBuilder()
    .setTitle('My Nest App')
    .setDescription('Test Swagger')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT);
}
bootstrap();
