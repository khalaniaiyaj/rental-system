import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelName } from '../../constant/enum';
import { ItemService } from '../item/item.service';
import { ItemSchema } from '../item/schema/item.schema';
import { UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { RentService } from './rent.service';
import { RentsController } from './rents.controller';
import { RentSchema } from './schema/rent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.RENT,
        schema: RentSchema,
      },
      {
        name: ModelName.USER,
        schema: UserSchema,
      },
      {
        name: ModelName.ITEM,
        schema: ItemSchema,
      },
    ]),
  ],
  providers: [RentService, UserService, ItemService],
  controllers: [RentsController],
})
export class RentModule {}
