import { ApiProperty } from '@nestjs/swagger';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';

export class TemplateMessageDto extends BaseMessageDto {
  @ApiProperty({
    type: MessageTypeEnum.text,
    default: MessageTypeEnum.template,
  })
  type: MessageTypeEnum.template;

  @ApiProperty()
  message: string;

  @ApiProperty()
  variables: Record<string, string>;
}
