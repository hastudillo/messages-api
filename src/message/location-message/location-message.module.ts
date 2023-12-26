import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationMessage } from './location-message.entity';
import { LocationMessageService } from './location-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocationMessage])],
  providers: [LocationMessageService],
  exports: [LocationMessageService],
})
export class LocationMessageModule {}
