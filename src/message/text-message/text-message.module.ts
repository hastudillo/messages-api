import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TextMessage } from './text-message.entity';
import { TextMessageService } from './text-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([TextMessage])],
  providers: [TextMessageService],
  exports: [TextMessageService],
})
export class TextMessageModule {}
