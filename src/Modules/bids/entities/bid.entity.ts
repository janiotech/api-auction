import { IsString, IsNumber } from 'class-validator';

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
import { User } from '../../users/entities/user.entity';

@Table
export class Bid extends Model {
  @Column
  bid_amount: string;

  @Column
  starting_bid: string;

  @Column
  current_bid: string;

  @Column
  @ForeignKey(() => User)
  user_id: number;

  @Column
  @ForeignKey(() => AuctionItem)
  auction_item_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => AuctionItem)
  auction_item: AuctionItem;
}
