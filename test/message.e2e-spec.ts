import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { validate as isValidUUID } from 'uuid';

import { AppModule } from '../src/app.module';
// import { attachmentMessageDtoMock } from '../src/message/mocks/attachment-message.dto.mock';
// import { locationMessageDtoMock } from '../src/message/mocks/location-message.dto.mock';
// import { templateMessageDtoMock } from '../src/message/mocks/template-message.dto.mock';
import { textMessageDtoMock } from '../src/message/mocks/text-message.dto.mock';
import { DataSource, Repository } from 'typeorm';
import { MYSQL } from '../src/common/constants';
import { ConfigService } from '@nestjs/config';
import { EnvEnum } from '../src/common/enums/env.enum';
import { Message } from '../src/message/entities/message.entity';
import { TextMessage } from '../src/message/text-message/text-message.entity';

describe('MessageController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  let messageRepository: Repository<Message>;
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
      entities: [Message, TextMessage],
      timezone: configService.get<string>(EnvEnum.TZ),
      synchronize: configService.get<boolean>(EnvEnum.MYSQL_SYNCHRONIZE),
    });

    await app.init();

    await dataSource.initialize();
    messageRepository = dataSource.getRepository(Message);
    textMessageRepository = dataSource.getRepository(TextMessage);
  });

  describe('/messages/incoming-messages (POST)', () => {
    // it('/messages/incoming-messages (POST) attachment', async () => {
    //   const res = await request(app.getHttpServer())
    //     .post('/messages/incoming-messages')
    //     .send(attachmentMessageDtoMock)
    //     .expect(201);
    //   const { id, ...rest } = res.body;
    //   expect(isValidUUID(id)).toBe(true);
    //   expect(rest).toEqual(attachmentMessageDtoMock);
    // });

    // it('/messages/incoming-messages (POST) location', async () => {
    //   const res = await request(app.getHttpServer())
    //     .post('/messages/incoming-messages')
    //     .send(locationMessageDtoMock)
    //     .expect(201);
    //   const { id, ...rest } = res.body;
    //   expect(isValidUUID(id)).toBe(true);
    //   expect(rest).toEqual(locationMessageDtoMock);
    // });

    it('/messages/incoming-messages (POST) text', async () => {
      const res = await request(app.getHttpServer())
        .post('/messages/incoming-messages')
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
    // it('/messages/outgoing-messages (POST) attachment', async () => {
    //   const res = await request(app.getHttpServer())
    //     .post('/messages/outgoing-messages')
    //     .send(attachmentMessageDtoMock)
    //     .expect(201);
    //   const { id, ...rest } = res.body;
    //   expect(isValidUUID(id)).toBe(true);
    //   expect(rest).toEqual(attachmentMessageDtoMock);
    // });

    // it('/messages/outgoing-messages (POST) location', async () => {
    //   const res = await request(app.getHttpServer())
    //     .post('/messages/outgoing-messages')
    //     .send(locationMessageDtoMock)
    //     .expect(201);
    //   const { id, ...rest } = res.body;
    //   expect(isValidUUID(id)).toBe(true);
    //   expect(rest).toEqual(locationMessageDtoMock);
    // });

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

    // it('/messages/outgoing-messages (POST) template', async () => {
    //   const res = await request(app.getHttpServer())
    //     .post('/messages/outgoing-messages')
    //     .send(templateMessageDtoMock)
    //     .expect(201);
    //   const { id, ...rest } = res.body;
    //   expect(isValidUUID(id)).toBe(true);
    //   expect(rest).toEqual(templateMessageDtoMock);
    // });
  });

  afterAll(async () => {
    await app.close();
    // const queryRunner: QueryRunner = dataSource.createQueryRunner();
    // await queryRunner.query('DROP TABLE message');
    await dataSource.destroy();
  });
});
