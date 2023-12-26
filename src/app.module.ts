import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { MessageModule } from './message/message.module';
import { ENV_FILE_PATH } from './common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_FILE_PATH }),
    DatabaseModule,
    MessageModule,
  ],
})
export class AppModule {}
