import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { User, UsersMutations } from "../dto/type";
import { UsersService } from "../services/users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User], { nullable: "itemsAndList", name: "allAccounts" })
  findAllAccounts() {
    return this.usersService.findAll();
  }

  @Mutation(() => UsersMutations)
  accounts() {
    return {}; // Magic with fieldResolver - all mutations are in field resolver
  }
}
