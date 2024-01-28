import { Inject, Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { RESEND_SERVICE_TOKEN } from "../constants";

@Injectable()
export class MailService {
  constructor(@Inject(RESEND_SERVICE_TOKEN) private readonly resendService: Resend) {}

  async accountVerification(firstname: string, mail: string, verificationCode: string) {
    const returnType = await this.resendService.emails.send({
      to: mail,
      html: `
      <div>
      Dear <h3>${firstname}, Thank you for signing up</h3>
      <p>Your account validation code is ${verificationCode}.<br> To confirm your email, please follow the button below</p>
      </div>`,
      subject: "Confirm your email",
      from: "no-reply@resend.dev"
    });
    console.log(returnType.data, returnType.error);
  }
}
