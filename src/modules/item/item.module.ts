import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelName } from '../../constant/enum';
import { UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { ItemService } from './item.service';
import { ItemsController } from './items.controller';
import { ItemSchema } from './schema/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.ITEM,
        schema: ItemSchema,
      },
      {
        name: ModelName.USER,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [ItemService, UserService],
  controllers: [ItemsController],
})
export class ItemModule {}
