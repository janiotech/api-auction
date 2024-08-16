import { Test, TestingModule } from '@nestjs/testing';
import { AuctionItemsService } from './auction_items.service';

describe('AuctionItemsService', () => {
  let service: AuctionItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuctionItemsService],
    }).compile();

    service = module.get<AuctionItemsService>(AuctionItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
