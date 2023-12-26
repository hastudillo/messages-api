import { NIL as UUID_NIL } from 'uuid';

import { StatusEnum } from '../../enums/status.enum';
import { AttachmentMessage } from '../attachment-message.entity';

export const attachmentMessageEntityMock: AttachmentMessage = {
  id: UUID_NIL,
  baseMessage: {
    id: UUID_NIL,
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  url: 'https://25516543.fs1.hubspotusercontent-eu1.net/hubfs/25516543/Saysimple%20webchat%20icon-1.png',
  contentType: 'image/png',
  fileName: 'Saysimple%20webchat%20icon-1.png',
};

export const attachmentMessageEntityBeforeSaveMock: AttachmentMessage = {
  baseMessage: {
    status: StatusEnum.received,
    time: '1970-01-01 00:00:00',
    messageId: 'messageId',
    conversationId: 'conversationId',
  },
  url: 'https://25516543.fs1.hubspotusercontent-eu1.net/hubfs/25516543/Saysimple%20webchat%20icon-1.png',
  contentType: 'image/png',
  fileName: 'Saysimple%20webchat%20icon-1.png',
};
