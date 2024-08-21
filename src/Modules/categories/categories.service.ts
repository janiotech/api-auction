import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const TypeC = createCategoryDto.type.toLowerCase().replace(/ /g, '');
    if (createCategoryDto.type) {
      const SearchCategoryByType = await this.categoryModel.findOne({
        where: { type: TypeC },
      });
      if (SearchCategoryByType) {
        throw new HttpException(
          'Já existe uma categoria cadastrada com esse nome!',
          HttpStatus.PRECONDITION_FAILED,
        );
      } else {
        await this.categoryModel.create({
          type: TypeC,
        });
        throw new HttpException('Categoria criada com sucesso!', HttpStatus.OK);
      }
    } else {
      throw new HttpException(
        'Formato inválido de categoria!',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async findAll() {
    return await this.categoryModel.findAll();
  }

  async findOne(id: number) {
    const SearchCategoryById = await this.categoryModel.findOne({
      where: { id: id },
    });
    if (SearchCategoryById) {
      return SearchCategoryById;
    } else {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneLocal(id: number) {
    const SearchCategoryById = await this.categoryModel.findOne({
      where: { id: id },
    });
    if (SearchCategoryById) {
      return SearchCategoryById;
    } else {
      return false;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const SearchCategoryById = await this.categoryModel.findOne({
      where: { id: id },
    });
    if (SearchCategoryById) {
      if (updateCategoryDto.type) {
        const TypeC = updateCategoryDto.type.toLowerCase().replace(/ /g, '');
        const SearchCategoryByType = await this.categoryModel.findOne({
          where: { type: TypeC },
        });
        if (SearchCategoryByType) {
          throw new HttpException(
            'Já existe uma categoria cadastrada com esse nome!',
            HttpStatus.PRECONDITION_FAILED,
          );
        } else {
          await SearchCategoryById.update({
            type: TypeC,
          });
          throw new HttpException(
            'Categoria atualizado com sucesso!',
            HttpStatus.OK,
          );
        }
      } else {
        throw new HttpException(
          'Formato inválido de atualização para categoria!',
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
    const SearchCategoryById = await this.categoryModel.findOne({
      where: { id: id },
    });
    if (SearchCategoryById) {
      await SearchCategoryById.destroy();
      throw new HttpException('Categoria deletada com sucesso!', HttpStatus.OK);
    } else {
      throw new HttpException(
        'Esse id não existe no banco de dados',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
