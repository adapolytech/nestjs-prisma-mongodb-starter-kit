import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { modules } from "./modules";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

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
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

