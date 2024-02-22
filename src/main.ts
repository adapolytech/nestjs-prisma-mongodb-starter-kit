import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvSchema } from "./core/services/config/config-schema.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<EnvSchema>);

  const port = +configService.get<string>("PORT");
  const prefix = configService.get<string>("SERVICE_PREFIX");

  app.setGlobalPrefix(prefix);

  await app.listen(port).then(() => {
    console.log(
      `GraphQL server listen at http://localhost:${port}/${prefix}/graphql\n
      REST Server at http://localhost:${port}/${prefix}`
    );
  });
}
bootstrap();
