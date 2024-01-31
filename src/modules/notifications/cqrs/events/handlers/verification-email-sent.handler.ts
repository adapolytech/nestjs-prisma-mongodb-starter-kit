import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MailService } from "src/modules/notifications/services/mail.service";
import { VerificationEmailSentEvent } from "../impl/verification-email.event";

@EventsHandler(VerificationEmailSentEvent)
export class VerificationEmailSentHandler implements IEventHandler<VerificationEmailSentEvent> {
  constructor(private emailService: MailService) {}

  async handle(event: VerificationEmailSentEvent) {
    const {
      createdUser: { email, firstname, verificationCode, activationLink }
    } = event;
    await this.emailService.resendService.emails.send({
      to: email,
      html: `
        <div>
            Dear <h3>${firstname},</h3>
            <p>Thank you for signing up</p>
            <p>Your account validation code is ${verificationCode}.<br> To confirm your email, please follow the button below</p>
            <a href="${activationLink}">verify</a>
        </div>`,
      subject: "Confirm your email",
      from: "no-reply@resend.dev"
    });
  }
}
