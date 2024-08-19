import { IsString, IsInt, Contains } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @Contains('user')
  @IsString()
  role?: string;
  @IsString()
  telephone: string;
  @IsString()
  cell_phone: string;
  @Contains('física')
  @IsString()
  user_type: 'física';
  @IsString()
  date_of_birth: string;
  @IsString()
  sex: 'Masculino' | 'Feminino' | 'Outro';
  @IsString()
  rg: string;
  @IsString()
  cpf: string;
}
