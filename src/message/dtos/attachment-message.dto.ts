import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';

export class AttachmentMessageDto extends BaseMessageDto {
  type: MessageTypeEnum.attachment;
  url: string;
}
