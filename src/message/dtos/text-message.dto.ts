import { ApiProperty } from '@nestjs/swagger';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';

export class TextMessageDto extends BaseMessageDto {
  @ApiProperty({ type: MessageTypeEnum.text, default: MessageTypeEnum.text })
  type: MessageTypeEnum.text;

  @ApiProperty()
  message: string;
}
