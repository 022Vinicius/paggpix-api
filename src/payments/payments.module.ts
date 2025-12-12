import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from '../entidades/payment.entity';
import { CustomersModule } from '../customers/customers.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]), 
    CustomersModule, 
  ],
  controllers: [PaymentsController], 
  providers: [PaymentsService],
})
export class PaymentsModule {}