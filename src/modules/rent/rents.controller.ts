import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../guard/auth.guard';
import { returnObjectId } from '../../helper/bcrypt.helper';
import { RentDto } from './dto/rent.dto';
import { actionMessages } from '../../constant/action-messages';
import { RentService } from './rent.service';
import { ItemService } from '../item/item.service';

const {
  error: { dataNotExists, cannotBookItem, itemTaken, alreadyBooked },
} = actionMessages;

@Controller('rents')
export class RentsController {
  constructor(
    private readonly rentService: RentService,
    private readonly itemService: ItemService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() rentInput: RentDto, @Req() req) {
    try {
      const { _id } = req.user;

      const { item } = rentInput;

      const checkItem = await this.itemService.findOne({
        _id: returnObjectId(item),
      });

      if (!checkItem) {
        throw new BadRequestException(dataNotExists);
      }

      if (checkItem.isTaken) {
        throw new BadRequestException(itemTaken);
      }

      if (String(checkItem.user) === String(_id)) {
        throw new BadRequestException(cannotBookItem);
      }

      const checkRent = await this.rentService.findOne({ item, bookedBy: _id });
      if (checkRent) {
        throw new BadGatewayException(alreadyBooked);
      }

      rentInput = {
        ...rentInput,
        cost: checkItem.rentPrice,
        bookedBy: _id,
      };

      await checkItem.update({ $set: { isTaken: true } });

      return await this.rentService.store(rentInput);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
