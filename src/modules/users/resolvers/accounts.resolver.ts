import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { Account, RegisterResponse } from "../dto/type";
import { Credentials, RegisterInput } from "../dto/input";
import { UsersService } from "../services/users.service";

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private usersService: UsersService) {}

  @ResolveField("register", () => RegisterResponse)
  async register(@Args("input") input: RegisterInput) {
    return await this.usersService.register(input);
  }

  @ResolveField("input", () => String)
  async login(@Args("input") input: Credentials) {
    return await this.usersService.login(input);
  }

  @ResolveField("allAccounts", () => [RegisterResponse], { nullable: "itemsAndList" })
  findAllAccounts() {
    return [];
  }
}
