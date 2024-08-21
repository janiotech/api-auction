import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auction } from './entities/auction.entity';

@Module({
  imports: [SequelizeModule.forFeature([Auction])],
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [AuctionsService],
})
export class AuctionsModule {}
