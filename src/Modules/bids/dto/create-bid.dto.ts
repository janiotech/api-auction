import { IsString, IsNumber } from 'class-validator';

export class CreateBidDto {
  @IsString()
  bid_amount: string;

  @IsString()
  starting_bid: string;

  @IsString()
  current_bid: string;

  auction_item_id: number;
  user_id: number;
}
