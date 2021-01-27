import {
  BadGatewayException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { validateToken } from '../helper/bcrypt.helper';

import { UserService } from '../modules/user/user.service';
import { actionMessages } from '../constant/action-messages';

const {
  error: { userNotExists },
} = actionMessages;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { headers } = request;

    const user = await validateToken(headers.authorization, this.userService);

    if (!user) {
      throw new BadGatewayException(userNotExists);
    }

    request.user = user;
    return request;
  }
}
