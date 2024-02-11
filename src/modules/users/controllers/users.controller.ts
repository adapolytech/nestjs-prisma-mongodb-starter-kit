import { Body, Controller, Get, Injectable, Post, Query } from "@nestjs/common";
import { UsersService } from "../services/users.service";

@Controller("users")
@Injectable()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("verify")
  async verifyEmail(
    @Body("code") code: string,
    @Query("token") token: string,
    @Query("email") email: string
  ) {
    return await this.usersService.verifyEmail(email, token, code);
  }

  @Get()
  getUsers() {
    this.usersService.verifyEmail(
      "paadama17@gmail.com",
      "8aM9m9UMGMdq98cK2r9fIJkPFwUP6j6Pqy3UpWigVEdNVZMhhCwzhZpXr5Pe",
      "894196"
    );
    return { data: [{ _id: 1, name: "adama" }] };
  }
}
