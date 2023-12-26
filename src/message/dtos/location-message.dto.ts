import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Equals,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageDto } from './base-message.dto';
import { ReturnedIdDto } from './returned-id.dto';

export class GeoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  long: number;
}

export class LocationMessageDto extends BaseMessageDto {
  @ApiProperty({
    type: MessageTypeEnum.text,
    default: MessageTypeEnum.location,
  })
  @Equals(MessageTypeEnum.location)
  type: MessageTypeEnum.location;

  @ApiProperty({ type: GeoDto })
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => GeoDto)
  geo: GeoDto;
}

export class ReturnedLocationMessageDto extends IntersectionType(
  ReturnedIdDto,
  LocationMessageDto,
) {}
