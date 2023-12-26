import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseMessageDto } from '../dtos/base-message.dto';
import {
  LocationMessageDto,
  ReturnedLocationMessageDto,
} from '../dtos/location-message.dto';
import { Message } from '../entities/message.entity';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageService } from '../services/base-message.service';
import { IncomingMessage } from '../types/incoming-message.type';
import { IMessageService } from '../types/message-service.interface';
import { OutgoingMessage } from '../types/outgoing-message.type';
import { LocationMessage } from './location-message.entity';

@Injectable()
export class LocationMessageService
  extends BaseMessageService
  implements IMessageService
{
  constructor(
    @InjectRepository(LocationMessage)
    private readonly locationMessageRepository: Repository<LocationMessage>,
  ) {
    super();
  }

  async save(
    newMessage: IncomingMessage | OutgoingMessage,
  ): Promise<ReturnedLocationMessageDto> {
    const baseMessage: Message = this.dtoToEntityMessage(newMessage);
    const locationMessage = this.dtoToEntity(
      newMessage as LocationMessageDto,
      baseMessage,
    );
    const savedLocationMessage: LocationMessage =
      await this.locationMessageRepository.save(locationMessage);
    const messageToReturn: BaseMessageDto = this.entityToMessageDto(
      savedLocationMessage.baseMessage,
      newMessage.type,
    );
    return this.entityToDto(savedLocationMessage, messageToReturn);
  }

  dtoToEntity(
    newMessage: LocationMessageDto,
    baseMessage: Message,
  ): LocationMessage {
    return {
      name: newMessage.geo.name,
      lat: newMessage.geo.lat,
      long: newMessage.geo.long,
      baseMessage,
    };
  }

  entityToDto(
    savedLocationMessage: LocationMessage,
    messageToReturn: BaseMessageDto,
  ): ReturnedLocationMessageDto {
    return {
      id: savedLocationMessage.baseMessage.id,
      type: messageToReturn.type as MessageTypeEnum.location,
      status: messageToReturn.status,
      time: messageToReturn.time,
      messageId: messageToReturn.messageId,
      conversationId: messageToReturn.conversationId,
      geo: {
        name: savedLocationMessage.name,
        lat: savedLocationMessage.lat,
        long: savedLocationMessage.long,
      },
    };
  }
}
