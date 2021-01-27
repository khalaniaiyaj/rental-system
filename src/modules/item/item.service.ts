import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '../../base-service/base.service';
import { ModelName } from '../../constant/enum';
import { ItemInterface } from './interface/item.interface';

@Injectable()
export class ItemService extends BaseService<ItemInterface> {
  constructor(
    @InjectModel(ModelName.ITEM)
    private readonly ItemModel: Model<ItemInterface>,
  ) {
    super(ItemModel);
  }
}
