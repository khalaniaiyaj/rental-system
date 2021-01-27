import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelName } from '../../constant/enum';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.USER,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
