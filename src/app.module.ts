import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { modules } from "./modules";

@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
