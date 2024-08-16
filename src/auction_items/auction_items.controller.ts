import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuctionItemsService } from './auction_items.service';
import { CreateAuctionItemDto } from './dto/create-auction_item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction_item.dto';

@Controller('auction-items')
export class AuctionItemsController {
  constructor(private readonly auctionItemsService: AuctionItemsService) {}

  @Post()
  create(@Body() createAuctionItemDto: CreateAuctionItemDto) {
    return this.auctionItemsService.create(createAuctionItemDto);
  }

  @Get()
  findAll() {
    return this.auctionItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuctionItemDto: UpdateAuctionItemDto) {
    return this.auctionItemsService.update(+id, updateAuctionItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionItemsService.remove(+id);
  }
}
