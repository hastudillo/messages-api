import { ApiProperty, IntersectionType } from '@nestjs/swagger';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';
import { ReturnedIdDto } from './returned-id.dto';

export class AttachmentMessageDto extends BaseMessageDto {
  @ApiProperty({
    type: MessageTypeEnum.text,
    default: MessageTypeEnum.attachment,
  })
  type: MessageTypeEnum.attachment;

  @ApiProperty()
  url: string;
}

export class ReturnedAttachmentMessageDto extends IntersectionType(
  ReturnedIdDto,
  AttachmentMessageDto,
) {}
