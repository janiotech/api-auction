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
import { AuctionItem } from '../../auction_items/entities/auction_item.entity';

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

  @HasMany(() => AuctionItem)
  auction_items: AuctionItem[];
}
