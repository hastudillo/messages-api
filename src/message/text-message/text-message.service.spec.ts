import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';

import { textMessageDtoMock } from '../mocks/text-message.dto.mock';
import { TextMessageService } from '../text-message/text-message.service';
import { TextMessage } from './text-message.entity';
import { textMessageEntityMock } from './mocks/text-message.entity.mock';

describe('TextMessageService', () => {
  let service: TextMessageService;
  let repository: Repository<TextMessage>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TextMessageService,
        {
          provide: getRepositoryToken(TextMessage),
          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<TextMessageService>(TextMessageService);
    repository = app.get<Repository<TextMessage>>(
      getRepositoryToken(TextMessage),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save a TextMessage entity and return a DTO', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(textMessageEntityMock);
      const result = await service.save(textMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(textMessageDtoMock);
    });
  });
});
