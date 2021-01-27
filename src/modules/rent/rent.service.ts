import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '../../base-service/base.service';
import { ModelName } from '../../constant/enum';
import { RentInterface } from './interface/rent.interface';

@Injectable()
export class RentService extends BaseService<RentInterface> {
  constructor(
    @InjectModel(ModelName.RENT)
    private readonly RentModel: Model<RentInterface>,
  ) {
    super(RentModel);
  }
}
