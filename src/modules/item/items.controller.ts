import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../guard/auth.guard';
import { returnObjectId } from '../../helper/bcrypt.helper';
import { ItemDto } from './dto/item.dto';
import { ItemService } from './item.service';
import { actionMessages } from '../../constant/action-messages';

const {
  error: { dataNotExists, cannotUpdate, cannotDelete },
} = actionMessages;

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() itemInput: ItemDto, @Req() req) {
    try {
      const { _id } = req.user;

      itemInput = {
        ...itemInput,
        user: _id,
      };

      return await this.itemService.store(itemInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async items() {
    return await this.itemService.find({});
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Body() itemInput: ItemDto, @Req() req, @Param() id: string) {
    try {
      const { _id } = req.user;

      const itemInfo = await this.itemService.findOne({
        _id: returnObjectId(id),
      });

      if (!itemInfo) {
        throw new BadRequestException(dataNotExists);
      }

      if (String(itemInfo.user) !== String(_id)) {
        throw new BadRequestException(cannotUpdate);
      }

      if (itemInfo.isTaken) {
        throw new BadRequestException(cannotUpdate);
      }

      return await this.itemService.update(
        { _id: returnObjectId(id) },
        itemInput,
        {
          lean: true,
          new: true,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Body() itemInput: ItemDto, @Req() req, @Param() id: string) {
    try {
      const { _id } = req.user;

      const itemInfo = await this.itemService.findOne({
        _id: returnObjectId(id),
      });

      if (!itemInfo) {
        throw new BadRequestException(dataNotExists);
      }

      if (String(itemInfo.user) !== String(_id)) {
        throw new BadRequestException(cannotUpdate);
      }

      if (itemInfo.isTaken) {
        throw new BadRequestException(cannotDelete);
      }

      return await this.itemService.remove({ _id: returnObjectId(id) });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
