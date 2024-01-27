import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { EnvSchema } from "./config-schema.service";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService<EnvSchema>) {}

  createJwtOptions(): JwtModuleOptions {
    const jwtSecret = this.configService.get<string>("JWT_SECRET");
    return {
      secret: jwtSecret,
      signOptions: { expiresIn: "40000s" }
    };
  }
}
