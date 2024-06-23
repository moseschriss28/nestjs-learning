import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // {
      //   name: 'User',
      //   schema: UserSchema,
      // },
    ]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class SharedModule {}
