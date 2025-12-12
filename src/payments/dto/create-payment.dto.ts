import { IsString, Length, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @Type(() => Number)
  @IsNumber()
  value: number;
}
