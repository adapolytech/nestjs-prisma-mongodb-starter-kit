import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EnvSchemaValidation } from "./core/services/config/config-schema.service";
import { DatabaseServiceFactory } from "./core/services/config/dababase-config.service";
import { GqlConfigService } from "./core/services/config/gql-config.service";
import { JwtConfigService } from "./core/services/config/jwt-config.service";
import { modules } from "./modules";

@Module({
  imports: [
    GraphQLModule.forRootAsync({ driver: ApolloDriver, useClass: GqlConfigService }),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, validate: EnvSchemaValidation }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: DatabaseServiceFactory
    }),
    JwtModule.registerAsync({ global: true, useClass: JwtConfigService }),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
