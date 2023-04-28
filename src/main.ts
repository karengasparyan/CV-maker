import * as dotenv from 'dotenv';
dotenv.config();
const { NODE_ENV, PORT, BASE_URL, SESSION_SECRET } = process.env;
import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as packageJson from '../package.json';
import { join } from 'path';
import {buildErrorObject} from "./utils/helpers";
const SWAGGER_URL = 'docs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    rawBody: true
  });
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  const config = new DocumentBuilder()
    .setTitle('Generate CV')
    .setDescription('Generate CV apis')
    .setVersion(packageJson.version)
    .build();
  const document = SwaggerModule.createDocument(app, config, {include: []});
  SwaggerModule.setup(SWAGGER_URL, app, document);

  app.use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: buildErrorObject
    }),
  );

  await app.listen(PORT || 4000);
}
bootstrap().then(() => console.info(`
WELCOME TO CV MAKER ${NODE_ENV.toUpperCase()}
SERVER RUN PORT: ${PORT}
BASE API URL: ${BASE_URL}
SWAGGER URL:  ${BASE_URL+'/'+SWAGGER_URL}`));