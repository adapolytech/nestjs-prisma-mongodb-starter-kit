import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { Credentials, RegisterInput } from "../dto/input";
import { RegisterResponse, UsersMutations } from "../dto/type";
import { UsersService } from "../services/users.service";

@Resolver(() => UsersMutations)
export class UsersMutationsResolver {
  constructor(private usersService: UsersService) {}

  @ResolveField("register", () => RegisterResponse)
  async register(@Args("input") input: RegisterInput): Promise<RegisterResponse> {
    return await this.usersService.register(input);
  }

  @ResolveField("login", () => String)
  async login(@Args("input") input: Credentials) {
    return await this.usersService.login(input);
  }
}
