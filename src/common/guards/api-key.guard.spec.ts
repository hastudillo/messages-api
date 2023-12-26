import { ConfigService } from '@nestjs/config';

import { ApiKeyGuard } from './api-key.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { EnvEnum } from '../enums/env.enum';
import { HEADER_API_KEY } from '../constants';

const configServiceMock = {
  get: jest.fn(),
};
const keyMock: string = 'keyMock';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(async () => {
    guard = new ApiKeyGuard(configServiceMock as unknown as ConfigService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should retrieve the header and allow access', async () => {
      const executionContextMock = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              [HEADER_API_KEY]: keyMock,
            },
          }),
        }),
      };
      const spyOnGetEnvVariable = jest
        .spyOn(configServiceMock, 'get')
        .mockReturnValue(keyMock);
      const result = guard.canActivate(
        executionContextMock as ExecutionContext,
      );
      expect(result).toBe(true);
      expect(spyOnGetEnvVariable).toHaveBeenCalledWith(EnvEnum.API_KEY);
    });

    it('should retrieve the header but not the same value than env variable', async () => {
      const executionContextMock = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              [HEADER_API_KEY]: keyMock,
            },
          }),
        }),
      };
      const spyOnGetEnvVariable = jest
        .spyOn(configServiceMock, 'get')
        .mockReturnValue('other');
      expect(() =>
        guard.canActivate(executionContextMock as ExecutionContext),
      ).toThrow(UnauthorizedException);
      expect(spyOnGetEnvVariable).toHaveBeenCalledWith(EnvEnum.API_KEY);
    });

    it('should retrieve the query param and allow access', async () => {
      const executionContextMock = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
            query: {
              api_key: keyMock,
            },
          }),
        }),
      };
      const spyOnGetEnvVariable = jest
        .spyOn(configServiceMock, 'get')
        .mockReturnValue(keyMock);
      const result = guard.canActivate(
        executionContextMock as ExecutionContext,
      );
      expect(result).toBe(true);
      expect(spyOnGetEnvVariable).toHaveBeenCalledWith(EnvEnum.API_KEY);
    });

    it("shouldn't find header nor query param", async () => {
      const executionContextMock = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
            query: {},
          }),
        }),
      };
      const spyOnGetEnvVariable = jest
        .spyOn(configServiceMock, 'get')
        .mockReturnValue(keyMock);
      expect(() =>
        guard.canActivate(executionContextMock as ExecutionContext),
      ).toThrow(UnauthorizedException);
      expect(spyOnGetEnvVariable).toHaveBeenCalledWith(EnvEnum.API_KEY);
    });
  });
});
