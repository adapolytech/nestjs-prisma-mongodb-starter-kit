import { Module } from "@nestjs/common";
import { UsersMutationsResolver } from "./resolvers/users-mutations.resolver";
import { UsersResolver } from "./resolvers/users.resolver";
import { UsersService } from "./services/users.service";

@Module({
  providers: [UsersResolver, UsersMutationsResolver, UsersService]
})
export class UsersModule {}
