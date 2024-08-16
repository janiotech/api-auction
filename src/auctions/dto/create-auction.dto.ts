import { IsString, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { DateDataType } from 'sequelize';

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
