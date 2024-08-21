import {
  Column,
  Model,
  Table,
  Default,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from '../../categories/entities/category.entity';
import { Auction } from '../../auctions/entities/auction.entity';

@Table
export class AuctionItem extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  photo_1: string;

  @Column
  photo_2: string;

  @Column
  photo_3: string;

  @Column
  photo_4: string;

  @Column
  year: string;

  @Column
  km: string;

  @Column
  fuel: string;

  @Column
  type_summed: string;

  @Column
  color: string;

  @Column
  location: string;

  @Column
  market_value: string;

  @Column
  has_a_key: string;

  @Column
  term_documentation: string;

  @Column
  seller: string;

  @Column
  starting_bid: string;

  @Column
  current_bid: string;

  @Column
  @ForeignKey(() => Category)
  category_id: number;

  @Column
  @ForeignKey(() => Auction)
  auction_id: number;

  @BelongsTo(() => Category)
  category: Category;
}
