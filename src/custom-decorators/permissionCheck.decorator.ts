import { SetMetadata } from '@nestjs/common';

export const Permissions = (...Permissions: string[]) => SetMetadata('Permissions', Permissions);
