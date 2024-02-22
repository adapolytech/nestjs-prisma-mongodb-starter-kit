import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { UsersMutationsResolver } from "./resolvers/users-mutations.resolver";
import { UsersResolver } from "./resolvers/users.resolver";
import { UsersService } from "./services/users.service";

@Module({
  providers: [UsersController, UsersResolver, UsersMutationsResolver, UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
