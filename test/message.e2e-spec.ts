import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { validate as isValidUUID } from 'uuid';

import { AppModule } from '../src/app.module';
import { attachmentMessageMock } from '../src/message/mocks/attachment-message.mock';
import { locationMessageMock } from '../src/message/mocks/location-message.mock';
import { templateMessageMock } from '../src/message/mocks/template-message.mock';
import { textMessageMock } from '../src/message/mocks/text-message.mock';

describe('MessageController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/messages/incoming-messages (POST)', () => {
    it('/messages/incoming-messages (POST) attachment', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .send(attachmentMessageMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageMock);
    });

    it('/messages/incoming-messages (POST) location', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .send(locationMessageMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageMock);
    });

    it('/messages/incoming-messages (POST) text', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .send(textMessageMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageMock);
    });
  });

  describe('/messages/outgoing-messages (POST)', () => {
    it('/messages/outgoing-messages (POST) attachment', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(attachmentMessageMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageMock);
    });

    it('/messages/outgoing-messages (POST) location', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(locationMessageMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageMock);
    });

    it('/messages/outgoing-messages (POST) text', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(textMessageMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageMock);
    });

    it('/messages/outgoing-messages (POST) template', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(templateMessageMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(templateMessageMock);
    });
  });
});
