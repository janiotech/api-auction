import { HttpException, HttpStatus, Injectable, Search } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address)
    private addressModel: typeof Address,
  ) {}

  async create(userId: string, createAddressDto: CreateAddressDto) {
    const SearchAddressById = await this.addressModel.findOne({
      where: { userId: userId },
    });
    if (!SearchAddressById) {
      const compareParams = this.hasTheSameParameters(
        createAddressDto,
        this.getAddress(createAddressDto),
      );
      if (compareParams) {
        this.addressModel.create({
          street: createAddressDto.street,
          number: createAddressDto.number,
          complement: createAddressDto.complement,
          district: createAddressDto.district,
          state: createAddressDto.state,
          city: createAddressDto.city,
          cep: createAddressDto.cep,
          userId: userId,
        });
        throw new HttpException('Endereço criado com sucesso!', HttpStatus.OK);
      } else {
        throw new HttpException(
          'Formato inválido de endereço!',
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    } else {
      throw new HttpException(
        'Esse usuário já tem um endereço cadastrado!',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async findAll() {
    return this.addressModel.findAll();
  }

  async findOne(id: number) {
    const IdAlreadyExists = await this.addressModel.findOne({
      where: { id: id },
    });
    if (IdAlreadyExists) {
      return IdAlreadyExists;
    } else {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneProfile(id: string) {
    const IdAlreadyExists = await this.addressModel.findOne({
      where: { userId: id },
    });
    if (IdAlreadyExists) {
      return IdAlreadyExists;
    } else {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(userId: string, updateAddressDto: UpdateAddressDto) {
    const SearchAddressById = await this.addressModel.findOne({
      where: { userId: userId },
    });
    if (!SearchAddressById) {
      throw new HttpException(
        'Esse usuário não tem nenhum endereço cadastrado!',
        HttpStatus.NOT_FOUND,
      );
    }
    if (
      updateAddressDto.cep ||
      updateAddressDto.city ||
      updateAddressDto.complement ||
      updateAddressDto.district ||
      updateAddressDto.number ||
      updateAddressDto.state ||
      updateAddressDto.street
    ) {
      await SearchAddressById.update(updateAddressDto);
      throw new HttpException(
        'Endereço atualizado com sucesso!',
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        'Formato inválido de endereço!',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }

  private hasTheSameParameters(obj1: CreateAddressDto, obj2: CreateAddressDto) {
    const chaves1 = Object.keys(obj1);
    const chaves2 = Object.keys(obj2);

    if (chaves1.length !== chaves2.length) {
      return false;
    }

    return chaves1.every((chave) => chaves2.includes(chave));
  }

  private getAddress(dto: CreateAddressDto): CreateAddressDto {
    return {
      street: dto.street,
      number: dto.number,
      complement: dto.complement,
      district: dto.district,
      state: dto.state,
      city: dto.city,
      cep: dto.cep,
      userId: dto.userId,
    };
  }
}
