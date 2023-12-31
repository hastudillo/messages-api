import { NIL as UUID_NIL } from 'uuid';

import { StatusEnum } from '../../enums/status.enum';
import { TextMessage } from '../text-message.entity';

export const textMessageEntityMock: TextMessage = {
  id: UUID_NIL,
  baseMessage: {
    id: UUID_NIL,
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  text: 'message mock',
};

export const textMessageEntityBeforeSaveMock: TextMessage = {
  baseMessage: {
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  text: 'message mock',
};

export const templateTextMessageEntityMock: TextMessage = {
  id: UUID_NIL,
  baseMessage: {
    id: UUID_NIL,
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  text: 'Hello John Doe, this is a message',
};

export const templateTextMessageEntityBeforeSaveMock: TextMessage = {
  baseMessage: {
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  text: 'Hello John Doe, this is a message',
};
