import { DataTypes } from 'sequelize';
import {
  Column,
  Model,
  Table,
  Default,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export class Category extends Model {
  @Column
  type: string;

  //   @HasMany(() => Address)
  //   addresses: Address[];
}
