import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { MessageModule } from './message/message.module';
import { ENV_FILE_PATH } from './common/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_FILE_PATH }),
    JwtModule.register({
      global: true,
    }),
    DatabaseModule,
    MessageModule,
  ],
})
export class AppModule {}
