import { ApiProperty, IntersectionType } from '@nestjs/swagger';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';
import { ReturnedIdDto } from './returned-id.dto';

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

export class ReturnedTemplateMessageDto extends IntersectionType(
  ReturnedIdDto,
  TemplateMessageDto,
) {}
