import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mustache from 'mustache';
import { Repository } from 'typeorm';

import { BaseMessageDto } from '../dtos/base-message.dto';
import {
  ReturnedTemplateMessageDto,
  TemplateMessageDto,
} from '../dtos/template-message.dto';
import { Message } from '../entities/message.entity';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageService } from '../services/base-message.service';
import { IncomingMessage } from '../types/incoming-message.type';
import { IMessageService } from '../types/message-service.interface';
import { OutgoingMessage } from '../types/outgoing-message.type';
import { TextMessage } from './text-message.entity';

@Injectable()
export class TemplateMessageService
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
  ): Promise<ReturnedTemplateMessageDto> {
    const baseMessage: Message = this.dtoToEntityMessage(newMessage);
    const textMessage = this.dtoToEntity(
      newMessage as TemplateMessageDto,
      baseMessage,
    );
    const savedTextMessage: TextMessage =
      await this.textMessageRepository.save(textMessage);
    const messageToReturn: BaseMessageDto = this.entityToMessageDto(
      savedTextMessage.baseMessage,
      newMessage.type,
    );
    return this.entityToDto(
      savedTextMessage,
      messageToReturn,
      newMessage as TemplateMessageDto,
    );
  }

  dtoToEntity(
    newMessage: TemplateMessageDto,
    baseMessage: Message,
  ): TextMessage {
    return {
      text: mustache.render(newMessage.message, newMessage.variables),
      baseMessage,
    };
  }

  entityToDto(
    savedTextMessage: TextMessage,
    messageToReturn: BaseMessageDto,
    newMessage: TemplateMessageDto,
  ): ReturnedTemplateMessageDto {
    return {
      id: savedTextMessage.baseMessage.id,
      type: messageToReturn.type as MessageTypeEnum.template,
      status: messageToReturn.status,
      time: messageToReturn.time,
      messageId: messageToReturn.messageId,
      conversationId: messageToReturn.conversationId,
      message: savedTextMessage.text,
      variables: newMessage.variables,
    };
  }
}
