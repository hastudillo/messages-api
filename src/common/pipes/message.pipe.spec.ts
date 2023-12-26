import { BadRequestException } from '@nestjs/common';
import * as classTransformer from 'class-transformer';
import * as classValidator from 'class-validator';

import { TextMessageDto } from '../../message/dtos/text-message.dto';
import { textMessageDtoMock } from '../../message/mocks/text-message.dto.mock';
import { allowedTypesForOutgoingDtos } from './mapping-message-types-and-dtos';
import { MessagePipe } from './message.pipe';
import { ValidationError } from 'class-validator';

describe('MessagePipe', () => {
  let pipe: MessagePipe;

  beforeEach(async () => {
    pipe = new MessagePipe(allowedTypesForOutgoingDtos);
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should receive, transform and validate a text message', async () => {
      const spyOnPlainToInstance = jest
        .spyOn(classTransformer, 'plainToInstance')
        .mockReturnValue(textMessageDtoMock);
      const spyOnValidate = jest
        .spyOn(classValidator, 'validate')
        .mockResolvedValue([]);
      const result = await pipe.transform(textMessageDtoMock);
      expect(result).toEqual(textMessageDtoMock);
      expect(spyOnPlainToInstance).toHaveBeenCalledWith(
        TextMessageDto,
        textMessageDtoMock,
      );
      expect(spyOnValidate).toHaveBeenCalledWith(textMessageDtoMock);
    });

    it('should throw an exception because type not recognized', async () => {
      expect(() => pipe.transform({})).rejects.toThrow(BadRequestException);
    });

    it('should throw an exception because validation failed (status unknown)', async () => {
      const textMessageDtoUnknownMock = {
        ...textMessageDtoMock,
        status: 'unknown',
      };
      const spyOnPlainToInstance = jest
        .spyOn(classTransformer, 'plainToInstance')
        .mockReturnValue(textMessageDtoUnknownMock);
      const spyOnValidate = jest
        .spyOn(classValidator, 'validate')
        .mockResolvedValue([new ValidationError()]);
      expect(() => pipe.transform(textMessageDtoUnknownMock)).rejects.toThrow(
        BadRequestException,
      );
      expect(spyOnPlainToInstance).toHaveBeenCalledWith(
        TextMessageDto,
        textMessageDtoUnknownMock,
      );
      expect(spyOnValidate).toHaveBeenCalledWith(textMessageDtoUnknownMock);
    });
  });
});
