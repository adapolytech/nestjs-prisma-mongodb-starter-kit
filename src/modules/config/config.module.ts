import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { EnvSchemaValidation } from "./schema";

@Module({ imports: [NestConfigModule.forRoot({ isGlobal: true, validate: EnvSchemaValidation })] })
export class ConfigModule {}
