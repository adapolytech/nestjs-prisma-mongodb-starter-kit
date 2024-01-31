import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
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
import { JwtConfigService } from "./core/services/config/jwt-config.service";
import { modules } from "./modules";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      path: "/graphql",
      playground: true,
      formatError(formattedError) {
        return {
          message: formattedError.message,
          code: formattedError?.extensions?.code || "INTERNAL_SERVER_ERROR",
          status: formattedError?.extensions?.status || 500
        };
      }
    }),
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
