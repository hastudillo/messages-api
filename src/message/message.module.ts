import { Logger, Module } from '@nestjs/common';

import { AttachmentMessageModule } from './attachment-message/attachment-message.module';
import { LocationMessageModule } from './location-message/location-message.module';
import { MessageController } from './message.controller';
import { StrategyService } from './services/strategy.service';
import { TextMessageModule } from './text-message/text-message.module';

@Module({
  imports: [AttachmentMessageModule, LocationMessageModule, TextMessageModule],
  controllers: [MessageController],
  providers: [Logger, StrategyService],
})
export class MessageModule {}
