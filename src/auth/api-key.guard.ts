import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { HEADER_API_KEY } from '../common/constants';
import { EnvEnum } from '../common/enums/env.enum';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  // ? https://swagger.io/docs/specification/authentication/api-keys/
  // ! the API key shoudn't be an env variable
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const key: string = (req.headers[HEADER_API_KEY] ??
      req.query.api_key) as string;
    if (this.configService.get<string>(EnvEnum.API_KEY) !== key) {
      throw new UnauthorizedException(
        "The API key wasn't provided or is incorrect",
      );
    }
    return true;
  }
}
