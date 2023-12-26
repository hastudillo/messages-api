import { ApiProperty, IntersectionType } from '@nestjs/swagger';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';
import { ReturnedIdDto } from './returned-id.dto';
import { Equals, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class TemplateMessageDto extends BaseMessageDto {
  @ApiProperty({
    type: MessageTypeEnum.text,
    default: MessageTypeEnum.template,
  })
  @Equals(MessageTypeEnum.template)
  type: MessageTypeEnum.template;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  // TODO: can be improved
  @IsObject()
  variables: Record<string, string>;
}

export class ReturnedTemplateMessageDto extends IntersectionType(
  ReturnedIdDto,
  TemplateMessageDto,
) {}
