import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { digitsCodeGenerator } from "src/core/utils";
import { Credentials, RegisterInput } from "../dto/input";
import type { RegisterResponse } from "../dto/type";

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(input: RegisterInput): Promise<RegisterResponse> {
    const { password: clearTextPassword, email } = input;
    const password = clearTextPassword; // hash password

    const existingAccount = await this.prismaService.account.findUnique({
      where: { email: input.email },
      select: { id: true }
    });
    if (existingAccount) return { code: HttpStatus.CONFLICT, message: "User already exist" };

    const emailVerificationCode = digitsCodeGenerator(6);

    const createAccount = await this.prismaService.account.create({
      data: { email, password, verificationCode: emailVerificationCode }
    });

    const createdUser = await this.prismaService.user.create({
      data: {
        firstname: input.firstname,
        lastname: input.lastname,
        accountId: createAccount.id
      }
    });
    return createdUser;
  }

  async login(input: Credentials) {
    const { email, password } = input;
    const findAccount = await this.prismaService.account.findFirst({
      where: { email },
      select: { password: true }
    });
    if (!findAccount) throw new NotFoundException({ message: "Email or Password incorrect" });
    return "Token not yet implemented";
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
