import { NIL as UUID_NIL } from 'uuid';

import { StatusEnum } from '../../enums/status.enum';
import { LocationMessage } from '../location-message.entity';

export const locationMessageEntityMock: LocationMessage = {
  id: UUID_NIL,
  baseMessage: {
    id: UUID_NIL,
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  name: 'somewhere',
  lat: 0,
  long: 0,
};

export const locationMessageEntityBeforeSaveMock: LocationMessage = {
  baseMessage: {
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  name: 'somewhere',
  lat: 0,
  long: 0,
};
