import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuctionItemsService } from './auction_items.service';
import { CreateAuctionItemDto } from './dto/create-auction_item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction_item.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

@Controller('auction-items')
export class AuctionItemsController {
  constructor(
    private readonly auctionItemsService: AuctionItemsService,
    private readonly uploadService: UploadService,
  ) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file', UploadService.uploadOptions))
  create(
    // @Request() req: any,
    // @Body() createAuctionItemDto: CreateAuctionItemDto,
    // @UploadedFile() file: Express.Multer.File,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    // return this.auctionItemsService.create(createAuctionItemDto);
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
  update(
    @Param('id') id: string,
    @Body() updateAuctionItemDto: UpdateAuctionItemDto,
  ) {
    return this.auctionItemsService.update(+id, updateAuctionItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionItemsService.remove(+id);
  }
}
