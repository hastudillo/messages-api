import { Message } from '../entities/message.entity';
import { StatusEnum } from '../enums/status.enum';

export const messageEntityMock: Message = {
  status: StatusEnum.received,
  time: '1970-01-01 00:00:00',
  messageId: 'messageId',
  conversationId: 'conversationId',
};
