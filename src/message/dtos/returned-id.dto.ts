import { ApiProperty } from '@nestjs/swagger';

export class ReturnedIdDto {
  @ApiProperty()
  id: string;
}
