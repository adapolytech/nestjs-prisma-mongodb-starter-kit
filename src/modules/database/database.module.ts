import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { DatabaseServiceFactory } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: DatabaseServiceFactory,
      imports: [ConfigModule],
    }),
  ],
})
export class DatabaseModule {}
