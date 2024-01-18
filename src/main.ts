import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000).then(() => {
    console.log(`GraphQL server listen at http://localhost:3000/graphql`);
  });
}
bootstrap();
