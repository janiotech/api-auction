import { IsString, IsInt, Contains } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;
  @IsString()
  permissions: string[];
}
