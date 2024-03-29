import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { $Enums, Account, User } from "@prisma/client";
import { addMinutes, isAfter } from "date-fns";
import { PrismaService } from "nestjs-prisma";
import { DateTime } from "src/core/helpers";
import { PasswordUtils, digitsCodeGenerator, generateToken } from "src/core/utils";
import { VerificationEmailSentEvent } from "src/modules/notifications/cqrs/events";
import { Credentials, RegisterInput } from "../dto/input";
import type { RegisterResponse } from "../dto/type";

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus
  ) {}

  async register(input: RegisterInput): Promise<RegisterResponse> {
    const { password: plainTextPassword, email } = input;

    const existingAccount = await this.prismaService.account.findUnique({
      where: { email: input.email },
      select: { id: true }
    });
    if (existingAccount) return { code: HttpStatus.CONFLICT, message: "User already exist" };

    const emailVerificationToken = generateToken(60);
    const emailVerificationCode = digitsCodeGenerator(6);
    const expiresAt = addMinutes(new Date(), 10);
    const password = await PasswordUtils.hash(plainTextPassword);

    const createAccount = await this.prismaService.account.create({
      data: {
        email,
        password,
        verificationCredentials: {
          code: emailVerificationCode,
          expiresAt,
          token: emailVerificationToken
        }
      }
    });

    const createdUser = await this.prismaService.user.create({
      data: {
        firstname: input.firstname,
        lastname: input.lastname,
        accountId: createAccount.id
      }
    });
    this.eventBus.publish(
      new VerificationEmailSentEvent({
        email,
        firstname: input.firstname,
        verificationCode: emailVerificationCode,
        activationLink: `http://localhost:3000/accounts/verify?token=${emailVerificationToken}` // @TODO add link in env
      })
    );
    return createdUser;
  }

  async verifyEmail(email: string, token: string, verificationCode: string) {
    const user = await this.prismaService.account.findRaw({
      filter: {
        email,
        "verificationCredentials.token": token,
        "verificationCredentials.code": verificationCode
      },
      options: { projection: { password: false } }
    });
    if (!user)
      return { code: HttpStatus.NOT_FOUND, message: "User not found/Validation code incorrect" };
    const foundedUser = user as unknown as Account;
    if (foundedUser.status === $Enums.AccountStatus.VERIFIED)
      return { code: HttpStatus.NOT_ACCEPTABLE, message: "User already verified" };
    if (isAfter(DateTime.now(), foundedUser.verificationCredentials.expiresAt))
      return {
        code: HttpStatus.BAD_REQUEST,
        message: "Token expired renewel token verification by resend verification email"
      };
    await this.prismaService.account.update({
      where: { id: foundedUser.id },
      data: { status: $Enums.AccountStatus.VERIFIED }
    });
    return { code: HttpStatus.OK, message: "User email successfully verified!" };
  }

  async login(input: Credentials) {
    const { email, password } = input;
    const findAccount = await this.prismaService.account.findFirst({
      where: { email },
      include: { user: true }
    });
    if (!findAccount) throw new NotFoundException({ message: "Email or Password incorrect" });
    return "Token not yet implemented";
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
