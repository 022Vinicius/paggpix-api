
import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(dto.cnpj, dto.value);
  }

  @Get()
  async list() {
    return this.paymentsService.findAll();
  }

  @Get(':txid')
  async get(@Param('txid') txid: string) {
    return this.paymentsService.findByTxid(txid);
  }

  @Patch(':txid/status')
  async updateStatus(@Param('txid') txid: string, @Body() dto: UpdateStatusDto) {
    return this.paymentsService.updateStatus(txid, dto.status);
  }
}
