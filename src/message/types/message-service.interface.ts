import { ConcreteMessageEntities } from '../../database/concrete-message-entities.type';
import { BaseMessageDto } from '../dtos/base-message.dto';
import { Message } from '../entities/message.entity';
import {
  IncomingMessage,
  ReturnedIncomingMessage,
} from '../types/incoming-message.type';
import {
  OutgoingMessage,
  ReturnedOutgoingMessage,
} from './outgoing-message.type';

export interface IMessageService {
  save(
    newMessage: IncomingMessage | OutgoingMessage,
  ): Promise<ReturnedIncomingMessage | ReturnedOutgoingMessage>;
  dtoToEntity(
    newMessage: IncomingMessage | OutgoingMessage,
    message: Message,
  ): ConcreteMessageEntities;
  entityToDto(
    savedTextMessage: ConcreteMessageEntities,
    messageToReturn: BaseMessageDto,
    newMessage?: IncomingMessage | OutgoingMessage,
  ): ReturnedIncomingMessage | ReturnedOutgoingMessage;
}
