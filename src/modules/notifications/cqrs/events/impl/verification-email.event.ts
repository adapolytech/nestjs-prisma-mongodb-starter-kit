import { IEvent } from "@nestjs/cqrs";

export class VerificationEmailSentEvent implements IEvent {
  constructor(
    public readonly createdUser: {
      firstname: string;
      verificationCode: string;
      email: string;
      activationLink: string;
    }
  ) {}
}
