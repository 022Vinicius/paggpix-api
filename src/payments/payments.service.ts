import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entidades/payment.entity';
import { CustomersService } from '../customers/customers.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepo: Repository<Payment>,
    private readonly customersService: CustomersService,
  ) {}

  async createPayment(cnpj: string, value: number) {
    const customer = await this.customersService.findByCnpj(cnpj);
    if (!customer) throw new NotFoundException('Customer not found');

    
    const txid = crypto.randomUUID().slice(0, 35);

    const payment = this.paymentsRepo.create({
      txid,
      customer_id: customer.id,
      total_value: value,
      status: 'PENDING',
    });

    return this.paymentsRepo.save(payment);
  }

  async findAll() {
    return this.paymentsRepo.find({ relations: ['customer'] });
  }

  async findByTxid(txid: string) {
    return this.paymentsRepo.findOne({ where: { txid } });
  }

  async updateStatus(txid: string, status: string) {
    const payment = await this.findByTxid(txid);
    if (!payment) throw new NotFoundException('Payment not found');

    if (!['PENDING', 'DONE'].includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    payment.status = status;
    return this.paymentsRepo.save(payment);
  }
}
