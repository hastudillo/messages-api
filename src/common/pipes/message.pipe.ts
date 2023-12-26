import {
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { IncomingMessage } from '../../message/types/incoming-message.type';
import {
  TypesIncomingDtosType,
  TypesOutgoingDtosType,
} from './mapping-message-types-and-dtos';

@Injectable()
export class MessagePipe implements PipeTransform {
  constructor(
    private readonly typesDtos: TypesIncomingDtosType | TypesOutgoingDtosType,
  ) {}

  async transform(value: any): Promise<IncomingMessage> {
    const dto: any = this.typesDtos[value.type];
    if (!dto) {
      throw new BadRequestException(
        `Invalid incoming message: type must be one of the following: ${Object.keys(
          this.typesDtos,
        ).join(', ')}`,
      );
    }
    const transformed: any = plainToInstance(dto, value);
    const validationErrors: ValidationError[] = await validate(transformed);
    if (validationErrors.length > 0) {
      const exceptionFactory = new ValidationPipe().createExceptionFactory();
      throw exceptionFactory(validationErrors);
    }
    return transformed;
  }
}
