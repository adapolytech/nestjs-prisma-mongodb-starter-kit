import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { Account, RegisterResponse, User } from "../dto/type";
import { Credentials, RegisterInput } from "../dto/input";
import { UsersService } from "../services/users.service";

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private usersService: UsersService) {}

  @ResolveField("register", () => RegisterResponse)
  async register(@Args("input") input: RegisterInput): Promise<RegisterResponse> {
    return await this.usersService.register(input);
  }

  @ResolveField("login", () => String)
  async login(@Args("input") input: Credentials) {
    return await this.usersService.login(input);
  }

  @ResolveField("allAccounts", () => [User], { nullable: "itemsAndList" })
  findAllAccounts() {
    return this.usersService.findAll();
  }
}
