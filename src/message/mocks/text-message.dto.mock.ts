import { TextMessageDto } from '../dtos/text-message.dto';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { StatusEnum } from '../enums/status.enum';

export const textMessageDtoMock: TextMessageDto = {
  type: MessageTypeEnum.text,
  status: StatusEnum.received,
  time: '1970-01-01T00:00:00.000Z',
  messageId: 'messageId',
  conversationId: 'conversationId',
  message: 'message mock',
};
