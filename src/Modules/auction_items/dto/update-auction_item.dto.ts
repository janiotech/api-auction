import { PartialType } from '@nestjs/mapped-types';
import { CreateAuctionItemDto } from './create-auction_item.dto';

export class UpdateAuctionItemDto extends PartialType(CreateAuctionItemDto) {}
