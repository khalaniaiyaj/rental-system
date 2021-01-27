import { BadRequestException } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import { compareSync, hashSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { actionMessages } from '../constant/action-messages';

const {
  error: { authorizationTokenRequired, bearerTokenRequired, tokenNotProvided },
} = actionMessages;

const config = new ConfigService();

export const compare = (plainText: string, passwordHash: string) =>
  compareSync(plainText, passwordHash);

export const returnObjectId = (id: string) => new Types.ObjectId(id);

export const hash = (plainText: string) =>
  hashSync(plainText, parseInt(process.env.SALT_ROUNDS, 10));

export const jwtSign = (payload) =>
  sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

export const verifyToken: any = (token: string, secret: string) =>
  verify(token, secret);

export const validateToken = async (authToken, service) => {
  if (!authToken) {
    throw new BadRequestException(authorizationTokenRequired);
  }

  const [bearerType, token] = authToken.split(' ');

  if (bearerType !== 'Bearer') {
    throw new BadRequestException(bearerTokenRequired);
  }

  if (!token) {
    throw new BadRequestException(tokenNotProvided);
  }

  try {
    const { id } = verifyToken(token, config.get('app.jwtSecret'));

    return await service.findOne(
      {
        _id: returnObjectId(id),
      },
      { _id: 1 },
    );
  } catch (err) {
    throw new BadRequestException(err.message);
  }
};
