import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { Credentials, RegisterInput } from "../dto/input";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(input: RegisterInput) {
    const { password: clearTextPassword } = input;
    const password = clearTextPassword; // hash password
    const createdUser = await this.prismaService.user.create({
      data: {
        firstname: input.firstname,
        lastname: input.lastname,
        account: { create: { password, email: input.email } }
      }
    });
    return createdUser;
  }

  async login(input: Credentials) {
    const { email, password } = input;
    const findAccount = await this.prismaService.account.findFirst({ where: { email }, select: { password: true } });
    if (!findAccount) throw new NotFoundException({ message: "Email or Password incorrect" });
    return "Bearer token";
  }
}
