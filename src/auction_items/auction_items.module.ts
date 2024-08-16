import { Module } from '@nestjs/common';
import { AuctionItemsService } from './auction_items.service';
import { AuctionItemsController } from './auction_items.controller';

@Module({
  controllers: [AuctionItemsController],
  providers: [AuctionItemsService],
})
export class AuctionItemsModule {}
