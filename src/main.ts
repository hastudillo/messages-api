import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { EnvEnum } from './common/enums/env.enum';
import {
  API_KEY_AUTH_NAME,
  HEADER_API_KEY,
  JWT_AUTH_NAME,
} from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', in: 'header', name: HEADER_API_KEY },
      API_KEY_AUTH_NAME,
    )
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
      },
      JWT_AUTH_NAME,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get<number>(EnvEnum.APP_PORT));
}
bootstrap();
