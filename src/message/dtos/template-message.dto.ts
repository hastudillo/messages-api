import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';

export class TemplateMessageDto extends BaseMessageDto {
  type: MessageTypeEnum.template;
  message: string;
  variables: Record<string, string>;
}
