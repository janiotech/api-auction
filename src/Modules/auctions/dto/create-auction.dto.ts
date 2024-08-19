import { IsString, IsNumber } from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  start_time: Date;

  @IsString()
  end_time: Date;
}
