import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';

import { actionMessages } from '../../constant/action-messages';
import { compare, hash, jwtSign } from '../../helper/bcrypt.helper';
import { LoginDto, UserDto } from './dto/user.dto';
import { UserService } from './user.service';

const {
  error: { emailExists, emailNotExists, passwordNotMatch, accountIsDeleted },
} = actionMessages;

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userInput: UserDto) {
    try {
      const { email, password } = userInput;

      const checkUser = await this.userService.findOne({ email });
      if (checkUser) {
        throw new BadRequestException(emailExists);
      }

      userInput = {
        ...userInput,
        password: hash(password),
      };

      const user = await this.userService.store(userInput);
      const token = jwtSign({ id: user._id });

      return {
        ...user,
        token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() loginInput: LoginDto) {
    try {
      const { email } = loginInput;

      const checkUser = await this.userService.findOne({ email });
      if (!checkUser) {
        throw new BadRequestException(emailNotExists);
      }

      if (checkUser.isDeleted) {
        throw new BadRequestException(accountIsDeleted);
      }

      const passwordMatch = compare(loginInput.password, checkUser.password);
      if (!passwordMatch) {
        throw new BadRequestException(passwordNotMatch);
      }

      const token = jwtSign({ id: checkUser._id });
      const { password, ...userInfo } = checkUser;

      return {
        ...userInfo,
        token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUser(@Body() userInput: UserDto, @Req() req) {
    try {
      const { _id } = req.user;

      if (userInput.password) {
        userInput = {
          ...userInput,
          password: hash(userInput.password),
        };
      }

      const user = await this.userService.update(
        { _id },
        {
          ...userInput,
        },
        {
          new: true,
          lean: true,
        },
      );

      const { password, ...userInfo } = user;
      return userInfo;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
