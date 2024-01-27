import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaOptionsFactory, PrismaService, PrismaServiceOptions, loggingMiddleware } from "nestjs-prisma";
import type { EnvSchema } from "./config-schema.service";

@Injectable()
export class DatabaseServiceFactory implements PrismaOptionsFactory {
  constructor(private configService: ConfigService<EnvSchema>) {}
  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        datasourceUrl: this.configService.get<string>("DATABASE_URL"),
        errorFormat: "pretty"
      },
      middlewares: [
        loggingMiddleware({
          logLevel: "debug",
          logger: new Logger(PrismaService.name),
          logMessage: (query) => `[Query] ${query.model}.${query.action} - ${query.executionTime}ms`
        })
      ]
    };
  }
}
