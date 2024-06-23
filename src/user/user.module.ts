import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [AuthModule, SharedModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}