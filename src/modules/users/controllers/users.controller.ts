import { Body, Controller, Injectable, Post, Query } from "@nestjs/common";
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
}
