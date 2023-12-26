import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttachmentMessage } from './attachment-message.entity';
import { AttachmentMessageService } from './attachment-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentMessage]), HttpModule],
  providers: [AttachmentMessageService],
  exports: [AttachmentMessageService],
})
export class AttachmentMessageModule {}
