import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';

import { locationMessageDtoMock } from '../mocks/location-message.dto.mock';
import { LocationMessage } from './location-message.entity';
import { LocationMessageService } from './location-message.service';
import {
  locationMessageEntityBeforeSaveMock,
  locationMessageEntityMock,
} from './mocks/location-message.entity.mock';

describe('LocationMessageService', () => {
  let service: LocationMessageService;
  let repository: Repository<LocationMessage>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        LocationMessageService,
        {
          provide: getRepositoryToken(LocationMessage),
          useClass: Repository,
        },
      ],
    }).compile();

    service = app.get<LocationMessageService>(LocationMessageService);
    repository = app.get<Repository<LocationMessage>>(
      getRepositoryToken(LocationMessage),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('save', () => {
    it('should save a LocationMessage entity and return a DTO', async () => {
      const spyOnSave = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(locationMessageEntityMock);
      const result = await service.save(locationMessageDtoMock);
      const { id, ...rest } = result;
      expect(isValidUUID(id)).toBe(true);
      expect(rest).toEqual(locationMessageDtoMock);
      expect(spyOnSave).toHaveBeenCalledWith(
        locationMessageEntityBeforeSaveMock,
      );
    });
  });
});
