import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MYSQL } from '../common/constants';
import { EnvEnum } from '../common/enums/env.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: MYSQL,
        host: configService.get<string>(EnvEnum.MYSQL_HOST),
        port: configService.get<number>(EnvEnum.MYSQL_PORT),
        username: configService.get<string>(EnvEnum.MYSQL_USER),
        password: configService.get<string>(EnvEnum.MYSQL_ROOT_PASSWORD),
        database: configService.get<string>(EnvEnum.MYSQL_DATABASE),
        entities: [],
        synchronize: configService.get<boolean>(EnvEnum.MYSQL_SYNCHRONIZE),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
