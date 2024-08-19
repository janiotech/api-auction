import { Module } from '@nestjs/common';
import { AuctionItemsService } from './auction_items.service';
import { AuctionItemsController } from './auction_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuctionItem } from './entities/auction_item.entity';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [SequelizeModule.forFeature([AuctionItem]), UploadModule],
  controllers: [AuctionItemsController],
  providers: [AuctionItemsService],
})
export class AuctionItemsModule {}
