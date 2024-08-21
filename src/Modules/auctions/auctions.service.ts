import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectModel(Auction)
    private auctionModel: typeof Auction,
  ) {}

  async create(createAuctionDto: CreateAuctionDto) {
    if (
      createAuctionDto.title &&
      createAuctionDto.description &&
      createAuctionDto.start_time &&
      createAuctionDto.end_time
    ) {
      const SearchAddressById = await this.auctionModel.findOne({
        where: { title: createAuctionDto.title },
      });
      if (SearchAddressById) {
        throw new HttpException(
          'Já existe um leilão cadastrado com esse nome!',
          HttpStatus.PRECONDITION_FAILED,
        );
      } else {
        await this.auctionModel.create({
          title: createAuctionDto.title,
          description: createAuctionDto.description,
          start_time: createAuctionDto.start_time,
          end_time: createAuctionDto.end_time,
        });
        throw new HttpException('Leilão criado com sucesso!', HttpStatus.OK);
      }
    } else {
      throw new HttpException(
        'Formato inválido de leilão!',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async findAll() {
    return await this.auctionModel.findAll();
  }

  async findOne(id: number) {
    const SearchActionById = await this.auctionModel.findOne({
      where: { id: id },
    });
    if (SearchActionById) {
      return SearchActionById;
    } else {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneLocal(id: number) {
    const SearchActionById = await this.auctionModel.findOne({
      where: { id: id },
    });
    if (SearchActionById) {
      return SearchActionById;
    } else {
      return false;
    }
  }

  async update(id: number, updateAuctionDto: UpdateAuctionDto) {
    const SearchActionById = await this.auctionModel.findOne({
      where: { id: id },
    });
    if (SearchActionById) {
      if (
        updateAuctionDto.title ||
        updateAuctionDto.description ||
        updateAuctionDto.start_time ||
        updateAuctionDto.end_time
      ) {
        await SearchActionById.update(updateAuctionDto);
        throw new HttpException(
          'Leilão atualizado com sucesso!',
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          'Formato inválido de leilão!',
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    } else {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number) {
    const SearchUserById = await this.auctionModel.findByPk(id);
    if (!SearchUserById) {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    } else {
      await SearchUserById.destroy();
      throw new HttpException('Leilão deletado com sucesso!', HttpStatus.OK);
    }
  }
}
