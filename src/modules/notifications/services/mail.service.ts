import { Inject, Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { RESEND_SERVICE_TOKEN } from "../constants";

@Injectable()
export class MailService {
  constructor(@Inject(RESEND_SERVICE_TOKEN) public resendService: Resend) {}

  async sendMail(...input: Parameters<typeof this.resendService.emails.send>) {
    await this.resendService.emails.send(...input);
  }
}
