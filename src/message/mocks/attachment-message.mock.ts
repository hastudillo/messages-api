import { AttachmentMessageDto } from '../dtos/attachment-message.dto';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { StatusEnum } from '../enums/status.enum';

export const attachmentMessageMock: AttachmentMessageDto = {
  type: MessageTypeEnum.attachment,
  status: StatusEnum.received,
  time: '1970-01-01T00:00:00.000Z',
  messageId: 'messageId',
  conversationId: 'conversationId',
  url: 'https://25516543.fs1.hubspotusercontent-eu1.net/hubfs/25516543/Saysimple%20webchat%20icon-1.png',
};
