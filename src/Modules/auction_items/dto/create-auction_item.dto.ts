import { IsString, IsInt, Contains, IsNumber } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { Auction } from '../../auctions/entities/auction.entity';

export class CreateAuctionItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  photo_1: string;

  @IsString()
  photo_2: string;

  @IsString()
  photo_3: string;

  @IsString()
  photo_4: string;

  @IsString()
  year: string;

  @IsString()
  km: string;

  @IsString()
  fuel: string;

  @IsString()
  type_summed: string;

  @IsString()
  color: string;

  @IsString()
  location: string;

  @IsString()
  market_value: string;

  @IsString()
  has_a_key: string;

  @IsString()
  term_documentation: string;

  @IsString()
  seller: string;

  @IsString()
  starting_bid: string;

  @IsString()
  current_bid: string;

  @IsNumber()
  category_id: number;

  @IsNumber()
  auction_id: number;
}
