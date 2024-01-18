import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";
import { DatabaseServiceFactory } from "./database.service";

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: DatabaseServiceFactory,
      imports: [ConfigModule]
    })
  ]
})
export class DatabaseModule {}
