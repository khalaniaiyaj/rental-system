import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '../../base-service/base.service';
import { ModelName } from '../../constant/enum';
import { UserInterface } from './interface/user.interface';

@Injectable()
export class UserService extends BaseService<UserInterface> {
  constructor(
    @InjectModel(ModelName.USER)
    private readonly UserModel: Model<UserInterface>,
  ) {
    super(UserModel);
  }
}
