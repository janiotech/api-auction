import { IsString, IsInt, Contains } from 'class-validator';
export class CreateUserjDto {
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

  @Contains('júridica')
  @IsString()
  user_type: 'júridica';

  @IsString()
  cnpj: string;

  @IsString()
  company_name: string;

  @IsString()
  contact_name: string;
}
