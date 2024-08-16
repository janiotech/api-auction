import { Injectable } from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction_item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction_item.dto';

@Injectable()
export class AuctionItemsService {
  create(createAuctionItemDto: CreateAuctionItemDto) {
    return 'This action adds a new auctionItem';
  }

  findAll() {
    return `This action returns all auctionItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auctionItem`;
  }

  update(id: number, updateAuctionItemDto: UpdateAuctionItemDto) {
    return `This action updates a #${id} auctionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} auctionItem`;
  }
}
