import { BaseMessageDto } from '../dtos/base-message.dto';
import { Message } from '../entities/message.entity';
import { TextMessage } from '../text-message/text-message.entity';
import {
  IncomingMessage,
  ReturnedIncomingMessage,
} from '../types/incoming-message.type';
import {
  OutgoingMessage,
  ReturnedOutgoingMessage,
} from './outgoing-message.type';

// TODO:
type ConcreteMessageEntities = TextMessage;

export interface IMessageService {
  save(
    newMessage: IncomingMessage | OutgoingMessage,
  ): Promise<ReturnedIncomingMessage | ReturnedOutgoingMessage>;
  dtoToEntity(
    newMessage: IncomingMessage | OutgoingMessage,
    message: Message,
  ): TextMessage;
  entityToDto(
    savedTextMessage: ConcreteMessageEntities,
    messageToReturn: BaseMessageDto,
  ): ReturnedIncomingMessage | ReturnedOutgoingMessage;
}
