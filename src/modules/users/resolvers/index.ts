import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { Account } from "../dto/type";

@Resolver(() => Account)
export class UsersResolver {
  @Mutation(() => Account)
  accounts() {
    return {}; // try the magic
  }

  @Query(() => String, { name: "accounts" })
  accountsQuery() {
    return "Not implemented!";
  }
}
