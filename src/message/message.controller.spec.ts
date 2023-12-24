import { Test, TestingModule } from '@nestjs/testing';
import { validate as isValidUUID } from 'uuid';

import { MessageController } from './message.controller';
import { attachmentMessageMock } from './mocks/attachment-message.mock';
import { locationMessageMock } from './mocks/location-message.mock';
import { templateMessageMock } from './mocks/template-message.mock';
import { textMessageMock } from './mocks/text-message.mock';

describe('MessageController', () => {
  let controller: MessageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
    }).compile();

    controller = app.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('receivingNewMessage', () => {
    it('should receive an incoming attachment message and return it', async () => {
      const result = await controller.receivingNewMessage(
        attachmentMessageMock,
      );
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageMock);
    });

    it('should receive an incoming location message and return it', async () => {
      const result = await controller.receivingNewMessage(locationMessageMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageMock);
    });

    it('should receive an incoming text message and return it', async () => {
      const result = await controller.receivingNewMessage(textMessageMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageMock);
    });
  });

  describe('sendingNewMessage', () => {
    it('should receive an outgoing attachment message and return it', async () => {
      const result = await controller.sendingNewMessage(attachmentMessageMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageMock);
    });

    it('should receive an outgoing location message and return it', async () => {
      const result = await controller.sendingNewMessage(locationMessageMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageMock);
    });

    it('should receive an outgoing text message and return it', async () => {
      const result = await controller.sendingNewMessage(textMessageMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageMock);
    });

    it('should receive an outgoing template message and return it', async () => {
      const result = await controller.sendingNewMessage(templateMessageMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(templateMessageMock);
    });
  });
});
