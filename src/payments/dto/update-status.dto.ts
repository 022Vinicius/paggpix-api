import { IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsIn(['PENDING', 'DONE'])
  status: 'PENDING' | 'DONE';
}
