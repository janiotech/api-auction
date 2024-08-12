import { Column, Model, Table, Default, HasMany } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Default('user')
  @Column
  role: string;

  @Column
  telephone: string;

  @Column
  cell_phone: string;

  @Column
  user_type: string;

  @Default(null)
  @Column
  date_of_birth?: Date | null;

  @Default(null)
  @Column
  sex?: string | null;

  @Default(null)
  @Column
  rg?: string | null;

  @Default(null)
  @Column
  cpf?: string | null;

  @Default(null)
  @Column
  cnpj?: string | null;

  @Default(null)
  @Column
  company_name?: string | null;

  @Default(null)
  @Column
  contact_name?: string | null;

  @HasMany(() => Address)
  addresses: Address[];
}
