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
export class Category extends Model {
  @Column
  type: string;

  @HasMany(() => AuctionItem)
  auction_items: AuctionItem[];
}
