import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttachmentMessage } from './attachment-message.entity';
import { AttachmentMessageService } from './attachment-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentMessage])],
  providers: [AttachmentMessageService],
  exports: [AttachmentMessageService],
})
export class AttachmentMessageModule {}
