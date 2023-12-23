import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';

export class TextMessageDto extends BaseMessageDto {
  type: MessageTypeEnum.text;
  message: string;
}
