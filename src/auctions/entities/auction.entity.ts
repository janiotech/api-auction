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
export class Auction extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column({ type: DataTypes.DATE })
  @Column
  start_time: Date;

  @Column({ type: DataTypes.DATE })
  end_time: Date;
}
