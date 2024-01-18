import { Query, Resolver } from "@nestjs/graphql";
import { Account } from "../dto/type";

@Resolver(() => Account)
export class UsersResolver {
  @Query(() => Account)
  accounts() {
    return {}; // try the magic
  }
}
