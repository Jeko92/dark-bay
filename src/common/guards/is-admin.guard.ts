import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isPublicHandler } from './is-public.util';
import type { RequestWithUser } from 'src/auth/request-with-user.interface';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (isPublicHandler(context, this.reflector)) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return request.user?.roles?.includes('admin') ?? false;
  }
}
