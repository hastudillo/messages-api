import { ApiProperty } from '@nestjs/swagger';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { StatusEnum } from '../enums/status.enum';

export class BaseMessageDto {
  type: MessageTypeEnum;

  @ApiProperty({ enum: StatusEnum })
  status: StatusEnum;

  @ApiProperty()
  time: string;

  @ApiProperty()
  messageId: string;

  @ApiProperty()
  conversationId: string;
}
