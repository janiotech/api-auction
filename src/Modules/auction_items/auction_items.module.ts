import { Module } from '@nestjs/common';
import { AuctionItemsService } from './auction_items.service';
import { AuctionItemsController } from './auction_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuctionItem } from './entities/auction_item.entity';
import { CategoriesModule } from '../categories/categories.module';
import { AuctionsModule } from '../auctions/auctions.module';

@Module({
  imports: [
    SequelizeModule.forFeature([AuctionItem]),
    CategoriesModule,
    AuctionsModule,
  ],
  controllers: [AuctionItemsController],
  providers: [AuctionItemsService],
  exports: [AuctionItemsService],
})
export class AuctionItemsModule {}
