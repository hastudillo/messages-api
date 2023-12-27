import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EnvEnum } from '../common/enums/env.enum';
import { JwtGuard } from './jwt.guard';

const configServiceMock = {
  get: jest.fn(),
};
const jwtServiceMock = {
  verifyAsync: jest.fn(),
};
const token: string = 'jwtMock';
const bearerToken: string = `Bearer ${token}`;
const secretMock: string = 'secretMock';
const payloadMock = {
  name: 'nameMock',
};

describe('JwtGuard', () => {
  let guard: JwtGuard;

  beforeEach(async () => {
    guard = new JwtGuard(
      jwtServiceMock as unknown as JwtService,
      configServiceMock as unknown as ConfigService,
    );
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should retrieve the bearer token in the header and allow access', async () => {
      const executionContextMock = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: bearerToken,
            },
          }),
        }),
      };
      const spyOnGetEnvVariable = jest
        .spyOn(configServiceMock, 'get')
        .mockReturnValue(secretMock);
      const spyOnVerifyAsync = jest
        .spyOn(jwtServiceMock, 'verifyAsync')
        .mockResolvedValue(payloadMock);
      const result = await guard.canActivate(
        executionContextMock as ExecutionContext,
      );
      expect(result).toBe(true);
      expect(spyOnGetEnvVariable).toHaveBeenCalledWith(EnvEnum.JWT_SECRET);
      expect(spyOnVerifyAsync).toHaveBeenCalledWith(token, {
        secret: secretMock,
      });
    });

    it('should retrieve the bearer token but could not be verified', async () => {
      const executionContextMock = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              authorization: bearerToken,
            },
          }),
        }),
      };
      const spyOnGetEnvVariable = jest
        .spyOn(configServiceMock, 'get')
        .mockReturnValue(secretMock);
      const spyOnVerifyAsync = jest
        .spyOn(jwtServiceMock, 'verifyAsync')
        .mockImplementation(() => {
          throw new Error();
        });
      expect(() =>
        guard.canActivate(executionContextMock as ExecutionContext),
      ).rejects.toThrow(UnauthorizedException);
      expect(spyOnGetEnvVariable).toHaveBeenCalledWith(EnvEnum.JWT_SECRET);
      expect(spyOnVerifyAsync).toHaveBeenCalledWith(token, {
        secret: secretMock,
      });
    });

    it("shouldn't find bearer token in header", async () => {
      const executionContextMock = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {},
          }),
        }),
      };
      const spyOnGetEnvVariable = jest
        .spyOn(configServiceMock, 'get')
        .mockReturnValue(secretMock);
      const spyOnVerifyAsync = jest.spyOn(jwtServiceMock, 'verifyAsync');
      expect(() =>
        guard.canActivate(executionContextMock as ExecutionContext),
      ).rejects.toThrow(UnauthorizedException);
      expect(spyOnGetEnvVariable).not.toHaveBeenCalled();
      expect(spyOnVerifyAsync).not.toHaveBeenCalled();
    });
  });
});
