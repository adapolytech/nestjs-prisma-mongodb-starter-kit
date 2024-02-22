import { ApolloDriver } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): Omit<GqlModuleOptions<ApolloDriver>, "driver"> {
    return {
      autoSchemaFile: "schema.gql",
      path: "/graphql",
      useGlobalPrefix: true
    };
  }
}
