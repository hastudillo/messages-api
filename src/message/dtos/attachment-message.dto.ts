import { ApiProperty } from '@nestjs/swagger';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';

export class AttachmentMessageDto extends BaseMessageDto {
  @ApiProperty({
    type: MessageTypeEnum.text,
    default: MessageTypeEnum.attachment,
  })
  type: MessageTypeEnum.attachment;

  @ApiProperty()
  url: string;
}
