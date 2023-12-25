import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { validate as isValidUUID } from 'uuid';

import { AppModule } from '../src/app.module';
import { attachmentMessageDtoMock } from '../src/message/mocks/attachment-message.dto.mock';
import { locationMessageDtoMock } from '../src/message/mocks/location-message.dto.mock';
import { templateMessageDtoMock } from '../src/message/mocks/template-message.dto.mock';
import { textMessageDtoMock } from '../src/message/mocks/text-message.dto.mock';

describe('MessageController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jest.useFakeTimers();
  });

  describe('/messages/incoming-messages (POST)', () => {
    it('/messages/incoming-messages (POST) attachment', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .send(attachmentMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageDtoMock);
    });

    it('/messages/incoming-messages (POST) location', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .send(locationMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageDtoMock);
    });

    it('/messages/incoming-messages (POST) text', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .send(textMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageDtoMock);
    });
  });

  describe('/messages/outgoing-messages (POST)', () => {
    it('/messages/outgoing-messages (POST) attachment', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(attachmentMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageDtoMock);
    });

    it('/messages/outgoing-messages (POST) location', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(locationMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageDtoMock);
    });

    it('/messages/outgoing-messages (POST) text', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(textMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageDtoMock);
    });

    it('/messages/outgoing-messages (POST) template', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(templateMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(templateMessageDtoMock);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
