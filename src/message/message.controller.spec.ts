import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { NIL as UUID_NIL, validate as isValidUUID } from 'uuid';

import { MessageTypeEnum } from './enums/message-type.enum';
import { MessageController } from './message.controller';
import { attachmentMessageDtoMock } from './mocks/attachment-message.dto.mock';
import { locationMessageDtoMock } from './mocks/location-message.dto.mock';
import { templateMessageDtoMock } from './mocks/template-message.dto.mock';
import { textMessageDtoMock } from './mocks/text-message.dto.mock';
import { StrategyService } from './services/strategy.service';
import { MessageService } from './types/message-service.type';

const messageServiceMock = {
  save: jest.fn(),
};

describe('MessageController', () => {
  let controller: MessageController;
  let strategyService: StrategyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: StrategyService,
          useValue: {
            getStrategy: jest.fn(),
          },
        },
        ConfigService,
      ],
    }).compile();

    controller = app.get<MessageController>(MessageController);
    strategyService = app.get<StrategyService>(StrategyService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(strategyService).toBeDefined();
  });

  describe('receivingNewMessage', () => {
    it('should receive an incoming attachment message and return it', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockResolvedValue({ ...attachmentMessageDtoMock, id: UUID_NIL });
      const result = await controller.receivingNewMessage(
        attachmentMessageDtoMock,
      );
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageDtoMock);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.attachment);
      expect(spyOnSave).toHaveBeenCalledWith(attachmentMessageDtoMock);
    });

    it('should receive an incoming location message and return it', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockResolvedValue({ ...locationMessageDtoMock, id: UUID_NIL });
      const result = await controller.receivingNewMessage(
        locationMessageDtoMock,
      );
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageDtoMock);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.location);
      expect(spyOnSave).toHaveBeenCalledWith(locationMessageDtoMock);
    });

    it('should receive an incoming text message and return it', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockResolvedValue({ ...textMessageDtoMock, id: UUID_NIL });
      const result = await controller.receivingNewMessage(textMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageDtoMock);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.text);
      expect(spyOnSave).toHaveBeenCalledWith(textMessageDtoMock);
    });

    it('should receive an incoming message and fail while getting strategy', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockImplementation(() => {
          throw Error();
        });
      const spyOnSave = jest.spyOn(messageServiceMock, 'save');
      expect(() =>
        controller.receivingNewMessage(textMessageDtoMock),
      ).rejects.toThrow(InternalServerErrorException);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.text);
      expect(spyOnSave).not.toHaveBeenCalled();
    });

    it('should receive an incoming message and fail while saving message', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockImplementation(() => {
          throw Error();
        });
      expect(() =>
        controller.receivingNewMessage(textMessageDtoMock),
      ).rejects.toThrow(InternalServerErrorException);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.text);
      expect(spyOnSave).toHaveBeenCalledWith(textMessageDtoMock);
    });
  });

  describe('sendingNewMessage', () => {
    it('should receive an outgoing attachment message and return it', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockResolvedValue({ ...attachmentMessageDtoMock, id: UUID_NIL });
      const result = await controller.sendingNewMessage(
        attachmentMessageDtoMock,
      );
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageDtoMock);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.attachment);
      expect(spyOnSave).toHaveBeenCalledWith(attachmentMessageDtoMock);
    });

    it('should receive an outgoing location message and return it', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockResolvedValue({ ...locationMessageDtoMock, id: UUID_NIL });
      const result = await controller.sendingNewMessage(locationMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageDtoMock);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.location);
      expect(spyOnSave).toHaveBeenCalledWith(locationMessageDtoMock);
    });

    it('should receive an outgoing text message and return it', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockResolvedValue({ ...textMessageDtoMock, id: UUID_NIL });
      const result = await controller.sendingNewMessage(textMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageDtoMock);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.text);
      expect(spyOnSave).toHaveBeenCalledWith(textMessageDtoMock);
    });

    it('should receive an outgoing template message and return it', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockResolvedValue({ ...templateMessageDtoMock, id: UUID_NIL });
      const result = await controller.sendingNewMessage(templateMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(templateMessageDtoMock);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.template);
      expect(spyOnSave).toHaveBeenCalledWith(templateMessageDtoMock);
    });

    it('should receive an incoming message and fail while getting strategy', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockImplementation(() => {
          throw Error();
        });
      const spyOnSave = jest.spyOn(messageServiceMock, 'save');
      expect(() =>
        controller.sendingNewMessage(textMessageDtoMock),
      ).rejects.toThrow(InternalServerErrorException);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.text);
      expect(spyOnSave).not.toHaveBeenCalled();
    });

    it('should receive an incoming message and fail while saving message', async () => {
      const spyOnGetStrategy = jest
        .spyOn(strategyService, 'getStrategy')
        .mockReturnValue(messageServiceMock as unknown as MessageService);
      const spyOnSave = jest
        .spyOn(messageServiceMock, 'save')
        .mockImplementation(() => {
          throw Error();
        });
      expect(() =>
        controller.sendingNewMessage(textMessageDtoMock),
      ).rejects.toThrow(InternalServerErrorException);
      expect(spyOnGetStrategy).toHaveBeenCalledWith(MessageTypeEnum.text);
      expect(spyOnSave).toHaveBeenCalledWith(textMessageDtoMock);
    });
  });
});
