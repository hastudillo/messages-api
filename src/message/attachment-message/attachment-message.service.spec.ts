import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';

import { attachmentMessageDtoMock } from '../mocks/attachment-message.dto.mock';
import { AttachmentMessage } from './attachment-message.entity';
import { AttachmentMessageService } from './attachment-message.service';
import { attachmentMessageEntityMock } from './mocks/attachment-message.entity.mock';

describe('AttachmentMessageService', () => {
  let service: AttachmentMessageService;
  let repository: Repository<AttachmentMessage>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AttachmentMessageService,
        {
          provide: getRepositoryToken(AttachmentMessage),
          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<AttachmentMessageService>(AttachmentMessageService);
    repository = app.get<Repository<AttachmentMessage>>(
      getRepositoryToken(AttachmentMessage),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save a AttachmentMessage entity and return a DTO', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(attachmentMessageEntityMock);
      const result = await service.save(attachmentMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageDtoMock);
    });
  });
});
