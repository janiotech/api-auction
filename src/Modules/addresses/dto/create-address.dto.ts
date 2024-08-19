import { IsString, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  complement: string;

  @IsString()
  district: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  cep: string;

  @IsNumber()
  userId: number;

  user?: User;
}
