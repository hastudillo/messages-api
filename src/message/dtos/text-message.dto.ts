import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Equals, IsNotEmpty, IsString } from 'class-validator';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';
import { ReturnedIdDto } from './returned-id.dto';

export class TextMessageDto extends BaseMessageDto {
  @ApiProperty({ type: MessageTypeEnum.text, default: MessageTypeEnum.text })
  @Equals(MessageTypeEnum.text)
  type: MessageTypeEnum.text;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class ReturnedTextMessageDto extends IntersectionType(
  ReturnedIdDto,
  TextMessageDto,
) {}
