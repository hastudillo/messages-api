import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';

import {
  replacedTemplateMessageDtoMock,
  templateMessageDtoMock,
} from '../mocks/template-message.dto.mock';
import {
  templateTextMessageEntityBeforeSaveMock,
  templateTextMessageEntityMock,
} from './mocks/text-message.entity.mock';
import { TemplateMessageService } from './template-message.service';
import { TextMessage } from './text-message.entity';

describe('TemplateMessageService', () => {
  let service: TemplateMessageService;
  let repository: Repository<TextMessage>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateMessageService,
        {
          provide: getRepositoryToken(TextMessage),
          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<TemplateMessageService>(TemplateMessageService);
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
      const spyOnSave = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(templateTextMessageEntityMock);
      const result = await service.save(templateMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(replacedTemplateMessageDtoMock);
      expect(spyOnSave).toHaveBeenCalledWith(
        templateTextMessageEntityBeforeSaveMock,
      );
    });
  });
});
