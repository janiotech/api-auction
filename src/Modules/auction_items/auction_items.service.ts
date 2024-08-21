import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAuctionItemDto } from './dto/create-auction_item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction_item.dto';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { InjectModel } from '@nestjs/sequelize';
import { AuctionItem } from './entities/auction_item.entity';
import { CategoriesService } from '../categories/categories.service';
import { AuctionsService } from '../auctions/auctions.service';

@Injectable()
export class AuctionItemsService {
  constructor(
    @InjectModel(AuctionItem)
    private auctionItemModel: typeof AuctionItem,
    private readonly categoriesService: CategoriesService,
    private readonly auctionsService: AuctionsService,
  ) {}

  async create(
    createAuctionItemDto: CreateAuctionItemDto,
    files: {
      photo_1?: Express.Multer.File[];
      photo_2?: Express.Multer.File[];
      photo_3?: Express.Multer.File[];
      photo_4?: Express.Multer.File[];
    },
  ) {
    console.log(files.photo_1);
    const photo_1 = files.photo_1.map((item) => item.filename)[0];
    const photo_2 = files.photo_2.map((item) => item.filename)[0];
    const photo_3 = files.photo_3.map((item) => item.filename)[0];
    const photo_4 = files.photo_4.map((item) => item.filename)[0];
    const conditionParams =
      createAuctionItemDto.name &&
      createAuctionItemDto.description &&
      photo_1 &&
      photo_2 &&
      photo_3 &&
      photo_4 &&
      createAuctionItemDto.year &&
      createAuctionItemDto.km &&
      createAuctionItemDto.fuel &&
      createAuctionItemDto.type_summed &&
      createAuctionItemDto.color &&
      createAuctionItemDto.location &&
      createAuctionItemDto.market_value &&
      createAuctionItemDto.has_a_key &&
      createAuctionItemDto.term_documentation &&
      createAuctionItemDto.seller &&
      createAuctionItemDto.starting_bid &&
      createAuctionItemDto.current_bid &&
      createAuctionItemDto.category_id &&
      createAuctionItemDto.auction_id;
    if (conditionParams) {
      const IsCategori = await this.categoriesService.findOneLocal(
        createAuctionItemDto.category_id,
      );
      const IsAuction = await this.auctionsService.findOneLocal(
        createAuctionItemDto.auction_id,
      );
      if (IsCategori && IsAuction) {
        await this.auctionItemModel.create({
          name: createAuctionItemDto.name,
          description: createAuctionItemDto.description,
          photo_1: photo_1,
          photo_2: photo_2,
          photo_3: photo_3,
          photo_4: photo_4,
          year: createAuctionItemDto.year,
          km: createAuctionItemDto.km,
          fuel: createAuctionItemDto.fuel,
          type_summed: createAuctionItemDto.type_summed,
          color: createAuctionItemDto.color,
          location: createAuctionItemDto.location,
          market_value: createAuctionItemDto.market_value,
          has_a_key: createAuctionItemDto.has_a_key,
          term_documentation: createAuctionItemDto.term_documentation,
          seller: createAuctionItemDto.seller,
          starting_bid: createAuctionItemDto.starting_bid,
          current_bid: createAuctionItemDto.current_bid,
          category_id: createAuctionItemDto.category_id,
          auction_id: createAuctionItemDto.auction_id,
        });
        throw new HttpException('Item criado com sucesso!', HttpStatus.OK);
      } else {
        await this.deleteImage(photo_1, photo_2, photo_3, photo_4);
        throw new HttpException(
          'A Categoria ou Leilão passados não existem!',
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    } else {
      await this.deleteImage(photo_1, photo_2, photo_3, photo_4);
      throw new HttpException(
        'Formato inválido de Item!',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async findAll() {
    return await this.auctionItemModel.findAll();
  }

  async findOne(id: number) {
    const SearchActionItemById = await this.auctionItemModel.findOne({
      where: { id: id },
    });
    if (SearchActionItemById) {
      return SearchActionItemById;
    } else {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateAuctionItemDto: UpdateAuctionItemDto) {
    return `This action updates a #${id} auctionItem`;
  }

  async remove(id: number) {
    const SearchAuctionItemById = await this.auctionItemModel.findByPk(id);
    if (!SearchAuctionItemById) {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    } else {
      await SearchAuctionItemById.destroy();
      await this.deleteImage(
        SearchAuctionItemById.photo_1,
        SearchAuctionItemById.photo_2,
        SearchAuctionItemById.photo_3,
        SearchAuctionItemById.photo_4,
      );
      throw new HttpException('Item deletado com sucesso!', HttpStatus.OK);
    }
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

  private async deleteImage(
    photo_1: string,
    photo_2: string,
    photo_3: string,
    photo_4: string,
  ): Promise<string> {
    if (photo_1) {
      const filePath = join(`src/uploads/${photo_1}`);
      console.log(filePath);
      console.log('Deleting file:', filePath);
      await unlink(filePath);
    }
    if (photo_2) {
      const filePath = join(`src/uploads/${photo_2}`);
      console.log('Deleting file:', filePath);
      await unlink(filePath);
    }
    if (photo_3) {
      const filePath = join(`src/uploads/${photo_3}`);
      console.log('Deleting file:', filePath);
      await unlink(filePath);
    }
    if (photo_4) {
      const filePath = join(`src/uploads/${photo_4}`);
      console.log('Deleting file:', filePath);
      await unlink(filePath);
    }
    return 'deletado!';
  }
}
