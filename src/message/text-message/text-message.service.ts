import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseMessageDto } from '../dtos/base-message.dto';
import {
  ReturnedTextMessageDto,
  TextMessageDto,
} from '../dtos/text-message.dto';
import { Message } from '../entities/message.entity';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageService } from '../services/base-message.service';
import { IncomingMessage } from '../types/incoming-message.type';
import { OutgoingMessage } from '../types/outgoing-message.type';
import { TextMessage } from './text-message.entity';
import { IMessageService } from '../types/message-service.interface';

@Injectable()
export class TextMessageService
  extends BaseMessageService
  implements IMessageService
{
  constructor(
    @InjectRepository(TextMessage)
    private readonly textMessageRepository: Repository<TextMessage>,
  ) {
    super();
  }

  async save(
    newMessage: IncomingMessage | OutgoingMessage,
    user?: string,
  ): Promise<ReturnedTextMessageDto> {
    const baseMessage: Message = this.dtoToEntityMessage(newMessage, user);
    const textMessage = this.dtoToEntity(
      newMessage as TextMessageDto,
      baseMessage,
    );
    const savedTextMessage: TextMessage =
      await this.textMessageRepository.save(textMessage);
    const messageToReturn: BaseMessageDto = this.entityToMessageDto(
      savedTextMessage.baseMessage,
      newMessage.type,
    );
    return this.entityToDto(savedTextMessage, messageToReturn);
  }

  dtoToEntity(newMessage: TextMessageDto, baseMessage: Message): TextMessage {
    return {
      baseMessage,
      text: newMessage.message,
    };
  }

  entityToDto(
    savedTextMessage: TextMessage,
    messageToReturn: BaseMessageDto,
  ): ReturnedTextMessageDto {
    return {
      id: savedTextMessage.baseMessage.id,
      type: messageToReturn.type as MessageTypeEnum.text,
      status: messageToReturn.status,
      time: messageToReturn.time,
      messageId: messageToReturn.messageId,
      conversationId: messageToReturn.conversationId,
      message: savedTextMessage.text,
    };
  }
}
