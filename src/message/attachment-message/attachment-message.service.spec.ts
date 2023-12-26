import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';

import { attachmentMessageDtoMock } from '../mocks/attachment-message.dto.mock';
import { AttachmentMessage } from './attachment-message.entity';
import { AttachmentMessageService } from './attachment-message.service';
import {
  attachmentMessageEntityBeforeSaveMock,
  attachmentMessageEntityMock,
} from './mocks/attachment-message.entity.mock';
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';

const axiosResponseMock = {
  headers: {
    'content-type': 'image/png',
  },
};

describe('AttachmentMessageService', () => {
  let service: AttachmentMessageService;
  let repository: Repository<AttachmentMessage>;
  let httpService: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AttachmentMessageService,
        {
          provide: getRepositoryToken(AttachmentMessage),
          useClass: Repository,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<AttachmentMessageService>(AttachmentMessageService);
    repository = app.get<Repository<AttachmentMessage>>(
      getRepositoryToken(AttachmentMessage),
    );
    httpService = app.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('save', () => {
    it('should save a AttachmentMessage entity and return a DTO', async () => {
      const spyOnGet = jest
        .spyOn(httpService, 'get')
        .mockReturnValue(
          of(axiosResponseMock) as unknown as Observable<AxiosResponse>,
        );
      const spyOnSave = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(attachmentMessageEntityMock);
      const result = await service.save(attachmentMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(attachmentMessageDtoMock);
      expect(spyOnGet).toHaveBeenCalledWith(attachmentMessageDtoMock.url);
      expect(spyOnSave).toHaveBeenCalledWith(
        attachmentMessageEntityBeforeSaveMock,
      );
    });
  });
});
