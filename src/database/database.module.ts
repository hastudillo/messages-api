import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYSQL } from '../common/constants';
import { EnvEnum } from '../common/enums/env.enum';
import { AttachmentMessage } from '../message/attachment-message/attachment-message.entity';
import { Message } from '../message/entities/message.entity';
import { LocationMessage } from '../message/location-message/location-message.entity';
import { TextMessage } from '../message/text-message/text-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: MYSQL,
        host: configService.get<string>(EnvEnum.MYSQL_HOST),
        port: configService.get<number>(EnvEnum.MYSQL_PORT),
        username: configService.get<string>(EnvEnum.MYSQL_ROOT_USER),
        password: configService.get<string>(EnvEnum.MYSQL_ROOT_PASSWORD),
        database: configService.get<string>(EnvEnum.MYSQL_DATABASE),
        entities: [Message, AttachmentMessage, LocationMessage, TextMessage],
        timezone: configService.get<string>(EnvEnum.TZ),
        synchronize: configService.get<boolean>(EnvEnum.MYSQL_SYNCHRONIZE),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
