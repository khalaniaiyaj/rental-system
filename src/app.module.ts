import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './modules/user/user.module';
import { ItemModule } from './modules/item/item.module';
import { RentModule } from './modules/rent/rent.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '../src/config/**/*.{ts,js}')),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database.mongodbUri'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ItemModule,
    RentModule,
  ],
})
export class AppModule {}
