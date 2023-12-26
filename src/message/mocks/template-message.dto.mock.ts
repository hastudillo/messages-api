import { TemplateMessageDto } from '../dtos/template-message.dto';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { StatusEnum } from '../enums/status.enum';

export const templateMessageDtoMock: TemplateMessageDto = {
  type: MessageTypeEnum.template,
  status: StatusEnum.received,
  time: '1970-01-01T00:00:00.000Z',
  messageId: 'messageId',
  conversationId: 'conversationId',
  message: 'Hello {{ name }}, this is a message',
  variables: { name: 'John Doe' },
};

export const replacedTemplateMessageDtoMock: TemplateMessageDto = {
  type: MessageTypeEnum.template,
  status: StatusEnum.received,
  time: '1970-01-01T00:00:00.000Z',
  messageId: 'messageId',
  conversationId: 'conversationId',
  message: 'Hello John Doe, this is a message',
  variables: { name: 'John Doe' },
};
