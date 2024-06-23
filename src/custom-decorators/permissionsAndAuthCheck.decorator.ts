///THIS IS A CUSTOM GROUPED DECORATOR THAT TAKE CARE OF ENTIRE THINGS LIKE PERMISSIONS AND AUTH CHECK ///
import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { PermissionCheckGuard } from 'src/guards/permissionCheck.guards';
import { Permissions } from './permissionCheck.decorator';

export const PermissionsAndAuthCheck = (...permissions: string[]) => {
    return applyDecorators(
      Permissions(...permissions),
      UseGuards(JwtAuthGuard, PermissionCheckGuard),
    );
  }

