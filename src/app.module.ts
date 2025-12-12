import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

 // 1. Configuração do Banco de Dados
  TypeOrmModule.forRoot({
  type: 'postgres',
 host: process.env.DB_HOST || "localhost",
 port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
 username: process.env.DB_USER,
 password: process.env.DB_PASS,
 database: process.env.DB_NAME,
      
     
      
autoLoadEntities: true,
synchronize: false,
 }),

  
    PaymentsModule, 
],
 controllers: [AppController],
providers: [AppService],
})
export class AppModule {}