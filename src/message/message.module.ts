import { Module } from '@nestjs/common';

import { MessageController } from './message.controller';
import { StrategyService } from './services/strategy.service';
import { TextMessageModule } from './text-message/text-message.module';

@Module({
  imports: [TextMessageModule],
  controllers: [MessageController],
  providers: [StrategyService],
})
export class MessageModule {}
