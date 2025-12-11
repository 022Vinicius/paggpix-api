import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Payment } from './payment.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ length: 255 })
  pix_key: string;

  @Column({ length: 20 })
  pix_type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];
}
