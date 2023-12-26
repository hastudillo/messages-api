import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';

import { AppModule } from '../src/app.module';
import { HEADER_API_KEY, MYSQL } from '../src/common/constants';
import { EnvEnum } from '../src/common/enums/env.enum';
import { AttachmentMessage } from '../src/message/attachment-message/attachment-message.entity';
import { Message } from '../src/message/entities/message.entity';
import { LocationMessage } from '../src/message/location-message/location-message.entity';
import { attachmentMessageDtoMock } from '../src/message/mocks/attachment-message.dto.mock';
import { locationMessageDtoMock } from '../src/message/mocks/location-message.dto.mock';
import { textMessageDtoMock } from '../src/message/mocks/text-message.dto.mock';
import { TextMessage } from '../src/message/text-message/text-message.entity';

const apiKey: string = 'abcdef12345';

import {
  replacedTemplateMessageDtoMock,
  templateMessageDtoMock,
} from '../src/message/mocks/template-message.dto.mock';
describe('MessageController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  let messageRepository: Repository<Message>;
  let attachmentMessageRepository: Repository<AttachmentMessage>;
  let locationMessageRepository: Repository<LocationMessage>;
  let textMessageRepository: Repository<TextMessage>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    dataSource = new DataSource({
      type: MYSQL,
      host: configService.get<string>(EnvEnum.MYSQL_HOST),
      port: configService.get<number>(EnvEnum.MYSQL_PORT),
      username: configService.get<string>(EnvEnum.MYSQL_ROOT_USER),
      password: configService.get<string>(EnvEnum.MYSQL_ROOT_PASSWORD),
      database: configService.get<string>(EnvEnum.MYSQL_DATABASE),
      entities: [Message, AttachmentMessage, LocationMessage, TextMessage],
      timezone: configService.get<string>(EnvEnum.TZ),
      synchronize: configService.get<boolean>(EnvEnum.MYSQL_SYNCHRONIZE),
    });

    await app.init();

    await dataSource.initialize();
    messageRepository = dataSource.getRepository(Message);
    attachmentMessageRepository = dataSource.getRepository(AttachmentMessage);
    locationMessageRepository = dataSource.getRepository(LocationMessage);
    textMessageRepository = dataSource.getRepository(TextMessage);
  });

  describe('/messages/incoming-messages (POST)', () => {
    it('/messages/incoming-messages (POST) attachment', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .set(HEADER_API_KEY, apiKey)
        .send(attachmentMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageDtoMock);

      const attachmentMessage: AttachmentMessage =
        await attachmentMessageRepository.findOne({
          where: { url: attachmentMessageDtoMock.url },
          relations: {
            baseMessage: true,
          },
        });
      const message: Message = await messageRepository.findOne({
        where: { id: attachmentMessage.baseMessage.id },
      });
      expect(id).toEqual(message.id);

      await attachmentMessageRepository.delete({ id: attachmentMessage.id });
      await messageRepository.delete({ id });
    });

    it('/messages/incoming-messages (POST) location', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .set(HEADER_API_KEY, apiKey)
        .send(locationMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageDtoMock);

      const locationMessage: LocationMessage =
        await locationMessageRepository.findOne({
          where: { name: locationMessageDtoMock.geo.name },
          relations: {
            baseMessage: true,
          },
        });
      const message: Message = await messageRepository.findOne({
        where: { id: locationMessage.baseMessage.id },
      });
      expect(id).toEqual(message.id);

      await locationMessageRepository.delete({ id: locationMessage.id });
      await messageRepository.delete({ id });
    });

    it('/messages/incoming-messages (POST) text', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
        .set(HEADER_API_KEY, apiKey)
        .send(textMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageDtoMock);

      const textMessage: TextMessage = await textMessageRepository.findOne({
        where: { text: textMessageDtoMock.message },
        relations: {
          baseMessage: true,
        },
      });
      const message: Message = await messageRepository.findOne({
        where: { id: textMessage.baseMessage.id },
      });
      expect(id).toEqual(message.id);

      await textMessageRepository.delete({ id: textMessage.id });
      await messageRepository.delete({ id });
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

      const attachmentMessage: AttachmentMessage =
        await attachmentMessageRepository.findOne({
          where: { url: attachmentMessageDtoMock.url },
          relations: {
            baseMessage: true,
          },
        });
      const message: Message = await messageRepository.findOne({
        where: { id: attachmentMessage.baseMessage.id },
      });
      expect(id).toEqual(message.id);

      await attachmentMessageRepository.delete({ id: attachmentMessage.id });
      await messageRepository.delete({ id });
    });

    it('/messages/outgoing-messages (POST) location', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(locationMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageDtoMock);

      const locationMessage: LocationMessage =
        await locationMessageRepository.findOne({
          where: { name: locationMessageDtoMock.geo.name },
          relations: {
            baseMessage: true,
          },
        });
      const message: Message = await messageRepository.findOne({
        where: { id: locationMessage.baseMessage.id },
      });
      expect(id).toEqual(message.id);

      await locationMessageRepository.delete({ id: locationMessage.id });
      await messageRepository.delete({ id });
    });

    it('/messages/outgoing-messages (POST) text', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(textMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageDtoMock);

      const textMessage: TextMessage = await textMessageRepository.findOne({
        where: { text: textMessageDtoMock.message },
        relations: {
          baseMessage: true,
        },
      });
      const message: Message = await messageRepository.findOne({
        where: { id: textMessage.baseMessage.id },
      });
      expect(id).toEqual(message.id);

      await textMessageRepository.delete({ id: textMessage.id });
      await messageRepository.delete({ id });
    });

    it('/messages/outgoing-messages (POST) template', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/outgoing-messages')
        .send(templateMessageDtoMock)
        .expect(201);
      const { id, ...rest } = res.body;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(replacedTemplateMessageDtoMock);

      const textMessage: TextMessage = await textMessageRepository.findOne({
        where: { text: replacedTemplateMessageDtoMock.message },
        relations: {
          baseMessage: true,
        },
      });
      const message: Message = await messageRepository.findOne({
        where: { id: textMessage.baseMessage.id },
      });
      expect(id).toEqual(message.id);

      await textMessageRepository.delete({ id: textMessage.id });
      await messageRepository.delete({ id });
    });
  });

  afterAll(async () => {
    await app.close();
    // const queryRunner: QueryRunner = dataSource.createQueryRunner();
    // await queryRunner.query('DROP TABLE message');
    await dataSource.destroy();
  });
});
