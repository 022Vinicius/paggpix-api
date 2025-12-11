import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('payments')
export class Payment {
  @PrimaryColumn({ length: 35 })
  txid: string;

  @Column({ type: 'uuid' })
  customer_id: string;

  @ManyToOne(() => Customer, (customer) => customer.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ length: 20, default: 'PENDING' })
  status: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  total_value: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
