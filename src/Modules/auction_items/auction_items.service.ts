import { Injectable } from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction_item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction_item.dto';

@Injectable()
export class AuctionItemsService {
  async create(createAuctionItemDto: CreateAuctionItemDto) {
    // if (createAuctionItemDto) {
    //   console.log(createAuctionItemDto);
    // }
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

  private hasTheSameParameters(
    obj1: CreateAuctionItemDto,
    obj2: CreateAuctionItemDto,
  ) {
    const chaves1 = Object.keys(obj1);
    const chaves2 = Object.keys(obj2);

    if (chaves1.length !== chaves2.length) {
      return false;
    }

    return chaves1.every((chave) => chaves2.includes(chave));
  }
}
