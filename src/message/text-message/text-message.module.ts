import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateMessageService } from './template-message.service';
import { TextMessage } from './text-message.entity';
import { TextMessageService } from './text-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([TextMessage])],
  providers: [TextMessageService, TemplateMessageService],
  exports: [TextMessageService, TemplateMessageService],
})
export class TextMessageModule {}
