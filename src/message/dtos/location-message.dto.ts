import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';

export class LocationMessageDto extends BaseMessageDto {
  type: MessageTypeEnum.location;
  geo: {
    name: string;
    lat: number;
    long: number;
  };
}
