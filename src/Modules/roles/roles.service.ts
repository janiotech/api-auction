import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}
  // create(createRoleDto: CreateRoleDto) {
  //   return 'This action adds a new role';
  // }

  async findAll() {
    return await this.roleModel.findAll();
  }

  async findOne(id: string) {
    const IdAlreadyExists = await this.roleModel.findOne({
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

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
