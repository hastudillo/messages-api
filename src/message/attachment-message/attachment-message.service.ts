import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AttachmentMessageDto,
  ReturnedAttachmentMessageDto,
} from '../dtos/attachment-message.dto';
import { BaseMessageDto } from '../dtos/base-message.dto';
import { Message } from '../entities/message.entity';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageService } from '../services/base-message.service';
import { IncomingMessage } from '../types/incoming-message.type';
import { IMessageService } from '../types/message-service.interface';
import { OutgoingMessage } from '../types/outgoing-message.type';
import { AttachmentMessage } from './attachment-message.entity';

@Injectable()
export class AttachmentMessageService
  extends BaseMessageService
  implements IMessageService
{
  constructor(
    @InjectRepository(AttachmentMessage)
    private readonly attachmentMessageRepository: Repository<AttachmentMessage>,
  ) {
    super();
  }

  async save(
    newMessage: IncomingMessage | OutgoingMessage,
  ): Promise<ReturnedAttachmentMessageDto> {
    const baseMessage: Message = this.dtoToEntityMessage(newMessage);
    const attachmentMessage = this.dtoToEntity(
      newMessage as AttachmentMessageDto,
      baseMessage,
    );
    const savedAttachmentMessage: AttachmentMessage =
      await this.attachmentMessageRepository.save(attachmentMessage);
    const messageToReturn: BaseMessageDto = this.entityToMessageDto(
      savedAttachmentMessage.baseMessage,
      newMessage.type,
    );
    return this.entityToDto(savedAttachmentMessage, messageToReturn);
  }

  dtoToEntity(
    newMessage: AttachmentMessageDto,
    baseMessage: Message,
  ): AttachmentMessage {
    return {
      url: newMessage.url,
      baseMessage,
    };
  }

  entityToDto(
    savedAttachmentMessage: AttachmentMessage,
    messageToReturn: BaseMessageDto,
  ): ReturnedAttachmentMessageDto {
    return {
      id: savedAttachmentMessage.baseMessage.id,
      type: messageToReturn.type as MessageTypeEnum.attachment,
      status: messageToReturn.status,
      time: messageToReturn.time,
      messageId: messageToReturn.messageId,
      conversationId: messageToReturn.conversationId,
      url: savedAttachmentMessage.url,
    };
  }
}
