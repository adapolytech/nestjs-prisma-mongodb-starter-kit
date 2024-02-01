import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import { EnvSchema } from "src/core/services/config/config-schema.service";
import { RESEND_SERVICE_TOKEN } from "./constants";
import { NotificationsEventHandlers } from "./cqrs/events/handlers";
import { MailService } from "./services/mail.service";

@Module({
  providers: [
    {
      provide: RESEND_SERVICE_TOKEN,
      useFactory: (config: ConfigService<EnvSchema>): Resend => {
        const resendApiKey = config.get<string>("RESEND_API_KEY");
        return new Resend(resendApiKey);
      },
      inject: [ConfigService]
    },
    MailService,
    ...NotificationsEventHandlers
  ],
  exports: [MailService]
})
export class NotificationsModule {}
