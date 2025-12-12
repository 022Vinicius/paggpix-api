import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientTokenGuard } from './auth/client-token.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; 




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new ClientTokenGuard());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
