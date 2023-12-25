import { Test, TestingModule } from '@nestjs/testing';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { attachmentMessageDtoMock } from '../mocks/attachment-message.dto.mock';
import { baseMessageDtoMock } from '../mocks/base-message.dto.mock';
import { locationMessageDtoMock } from '../mocks/location-message.dto.mock';
import { messageEntityMock } from '../mocks/message.entity.mock';
import { templateMessageDtoMock } from '../mocks/template-message.dto.mock';
import { textMessageDtoMock } from '../mocks/text-message.dto.mock';
import { BaseMessageService } from './base-message.service';

describe('BaseMessageService', () => {
  let service: BaseMessageService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [BaseMessageService],
    }).compile();

    service = app.get<BaseMessageService>(BaseMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('dtoToEntityMessage', () => {
    it('should receive an attachment message and return a message entity', () => {
      const result = service.dtoToEntityMessage(attachmentMessageDtoMock);
      expect(result).toEqual(messageEntityMock);
    });

    it('should receive a location message and return a message entity', () => {
      const result = service.dtoToEntityMessage(locationMessageDtoMock);
      expect(result).toEqual(messageEntityMock);
    });

    it('should receive a text message and return a message entity', () => {
      const result = service.dtoToEntityMessage(textMessageDtoMock);
      expect(result).toEqual(messageEntityMock);
    });

    it('should receive a template message and return a message entity', () => {
      const result = service.dtoToEntityMessage(templateMessageDtoMock);
      expect(result).toEqual(messageEntityMock);
    });
  });

  describe('entityToMessageDto', () => {
    it('should receive a message entity (plus a type) and return an attachment message', () => {
      const result = service.entityToMessageDto(
        messageEntityMock,
        MessageTypeEnum.attachment,
      );
      expect(result).toEqual({
        ...baseMessageDtoMock,
        type: MessageTypeEnum.attachment,
      });
    });

    it('should receive a message entity (plus a type) a location message and return', () => {
      const result = service.entityToMessageDto(
        messageEntityMock,
        MessageTypeEnum.location,
      );
      expect(result).toEqual({
        ...baseMessageDtoMock,
        type: MessageTypeEnum.location,
      });
    });

    it('should receive a message entity (plus a type) and return a text message', () => {
      const result = service.entityToMessageDto(
        messageEntityMock,
        MessageTypeEnum.text,
      );
      expect(result).toEqual({
        ...baseMessageDtoMock,
        type: MessageTypeEnum.text,
      });
    });

    it('should receive a message entity (plus a type) and return a template message', () => {
      const result = service.entityToMessageDto(
        messageEntityMock,
        MessageTypeEnum.template,
      );
      expect(result).toEqual({
        ...baseMessageDtoMock,
        type: MessageTypeEnum.template,
      });
    });
  });
});
