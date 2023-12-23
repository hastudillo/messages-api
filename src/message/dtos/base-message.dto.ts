import { MessageTypeEnum } from '../enums/message-type.enum';
import { StatusEnum } from '../enums/status.enum';

export class BaseMessageDto {
  type: MessageTypeEnum;
  status: StatusEnum;
  time: string;
  messageId: string;
  conversationId: string;
}
