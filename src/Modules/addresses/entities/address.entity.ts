import {
  Column,
  Model,
  Table,
  Default,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
export class Address extends Model {
  @Column
  street: string;

  @Column
  number: string;

  @Column
  complement: string;

  @Column
  district: string;

  @Column
  state: string;

  @Column
  city: string;

  @Column
  cep: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
