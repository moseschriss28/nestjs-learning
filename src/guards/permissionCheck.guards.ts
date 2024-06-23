import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionCheckGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>('Permissions', context.getHandler());
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest(); /// AFTER THE TAOKEN VALIDATION AND SETTED THE USER DATA IN THE MIDDLEWARE
    if (!user) {
       throw new HttpException('UnAuthorized', HttpStatus.UNAUTHORIZED);
    }
    return requiredPermissions.some((permission) => user.permissions?.includes(permission));
  }
}
