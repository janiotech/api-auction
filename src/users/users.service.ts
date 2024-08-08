import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserjDto } from './dto/create-user-j.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto | CreateUserjDto) {
    const validateDateAndTtypeUser = await this.processarUsuario(createUserDto);
    if (validateDateAndTtypeUser) {
      const emailAlreadyExists = await this.userModel.findOne({
        where: { email: createUserDto.email },
      });
      if (!emailAlreadyExists) {
        if (createUserDto.user_type === 'física') {
          const passwordHash = await this.gerateHashPassword(
            createUserDto.password,
          );
          const createUserInDatabase = await this.userModel.create({
            name: createUserDto.name,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: passwordHash,
            telephone: createUserDto.telephone,
            cell_phone: createUserDto.cell_phone,
            user_type: 'física',
            date_of_birth: createUserDto.date_of_birth,
            sex: createUserDto.sex,
            rg: createUserDto.rg,
            cpf: createUserDto.cpf,
          });
          throw new HttpException('User created successfully', HttpStatus.OK);
        } else {
          const passwordHash = await this.gerateHashPassword(
            createUserDto.password,
          );
          const createUserInDatabase = await this.userModel.create({
            name: createUserDto.name,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: passwordHash,
            telephone: createUserDto.telephone,
            cell_phone: createUserDto.cell_phone,
            user_type: 'júridica',
            cnpj: createUserDto.cnpj,
            company_name: createUserDto.company_name,
            contact_name: createUserDto.contact_name,
          });
          throw new HttpException('User created successfully', HttpStatus.OK);
        }
      }
      throw new HttpException(
        'email já cadastrado',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(email: string) {
    const emailAlreadyExists = await this.userModel.findOne({
      where: { email: email },
    });
    return emailAlreadyExists;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async findAndress(cep: number) {
    const fetch = await this.httpService
      .get(`http://viacep.com.br/ws/${cep}/json/`)
      .toPromise()
      .then((res) => res.data)
      .catch(() => 'erro');
    return fetch.localidade;
  }

  private async processarUsuario(dto: CreateUserDto | CreateUserjDto) {
    if (dto.user_type === 'física') {
      const compare = this.hasTheSameParameters(
        dto,
        this.createPhysicalUser(dto),
      );
      if (compare) {
        return this.createPhysicalUser(dto);
      } else {
        throw new HttpException(
          'Formato inválido para o tipo de usuário físico!',
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    } else if (dto.user_type === 'júridica') {
      const compare = this.hasTheSameParameters(dto, this.createLegalUser(dto));
      if (compare) {
        return this.createLegalUser(dto);
      } else {
        throw new HttpException(
          'Formato inválido para o tipo de usuário júridico!',
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    } else {
      throw new HttpException(
        'Tipo de usuário não reconhecido',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  private createPhysicalUser(dto: CreateUserDto): CreateUserDto {
    return {
      name: dto.name,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      telephone: dto.telephone,
      cell_phone: dto.cell_phone,
      user_type: 'física',
      date_of_birth: dto.date_of_birth,
      sex: dto.sex,
      rg: dto.rg,
      cpf: dto.cpf,
    };
  }

  private createLegalUser(dto: CreateUserjDto): CreateUserjDto {
    return {
      name: dto.name,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      telephone: dto.telephone,
      cell_phone: dto.cell_phone,
      user_type: 'júridica',
      cnpj: dto.cnpj,
      company_name: dto.company_name,
      contact_name: dto.contact_name,
    };
  }

  private hasTheSameParameters(
    obj1: CreateUserDto | CreateUserjDto,
    obj2: CreateUserDto | CreateUserjDto,
  ) {
    const chaves1 = Object.keys(obj1);
    const chaves2 = Object.keys(obj2);

    if (chaves1.length !== chaves2.length) {
      return false;
    }

    return chaves1.every((chave) => chaves2.includes(chave));
  }

  private async gerateHashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async findOneEmail(email: string) {
    const userWithEmail = await this.userModel.findOne({
      where: { email: email },
    });
    return userWithEmail;
  }

  async compareHashPasswordAndEmail(email: string, password: string) {
    const user = await this.findOneEmail(email);
    const validatePass = await bcrypt.compare(password, user.password);
    if (user && validatePass) {
      return user;
    } else {
      false;
    }
  }
}
