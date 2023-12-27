import { format } from 'date-fns';

import { DATE_FORMAT, MILLISECONDS_IN_A_MINUTE } from '../../common/constants';
import { BaseMessageDto } from '../dtos/base-message.dto';
import { Message } from '../entities/message.entity';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { StatusEnum } from '../enums/status.enum';
import { IncomingMessage } from '../types/incoming-message.type';
import { OutgoingMessage } from '../types/outgoing-message.type';

export class BaseMessageService {
  dtoToEntityMessage(
    newMessage: IncomingMessage | OutgoingMessage,
    user?: string,
  ): Message {
    return {
      status: newMessage.status,
      messageId: newMessage.messageId,
      conversationId: newMessage.conversationId,
      time: this.isoDateToUtcDate(newMessage.time),
      from: user,
    };
  }

  entityToMessageDto(
    savedMessage: Message,
    type: MessageTypeEnum,
  ): BaseMessageDto {
    return {
      type,
      status: savedMessage.status as StatusEnum,
      time: this.utcDateToIsoDate(savedMessage.time),
      messageId: savedMessage.messageId,
      conversationId: savedMessage.conversationId,
    };
  }

  private isoDateToUtcDate(iso: string): string {
    const date: Date = new Date(iso);
    const adjustedDate = new Date(
      date.valueOf() + date.getTimezoneOffset() * MILLISECONDS_IN_A_MINUTE,
    );
    return format(adjustedDate, DATE_FORMAT);
  }

  private utcDateToIsoDate(utc: string): string {
    const date: Date = new Date(Date.parse(utc));
    const adjustedDate = new Date(
      date.valueOf() - date.getTimezoneOffset() * MILLISECONDS_IN_A_MINUTE,
    );
    return adjustedDate.toISOString();
  }
}
