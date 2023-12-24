import { ApiProperty, IntersectionType } from '@nestjs/swagger';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';
import { ReturnedIdDto } from './returned-id.dto';

export class GeoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;
}

export class LocationMessageDto extends BaseMessageDto {
  @ApiProperty({
    type: MessageTypeEnum.text,
    default: MessageTypeEnum.location,
  })
  type: MessageTypeEnum.location;

  @ApiProperty({ type: GeoDto })
  geo: GeoDto;
}

export class ReturnedLocationMessageDto extends IntersectionType(
  ReturnedIdDto,
  LocationMessageDto,
) {}
