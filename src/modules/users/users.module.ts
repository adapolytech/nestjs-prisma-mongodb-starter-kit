import { Module } from "@nestjs/common";
import { UsersResolver } from "./resolvers";
import { AccountsResolver } from "./resolvers/accounts.resolver";
import { UsersService } from "./services/users.service";

@Module({ imports: [], providers: [AccountsResolver, UsersResolver, UsersService] })
export class UsersModule {}
