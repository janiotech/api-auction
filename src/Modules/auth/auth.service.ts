import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const userLoginValidate =
      await this.usersService.compareHashPasswordAndEmail(email, pass);
    if (userLoginValidate) {
      const { password, ...result } = userLoginValidate;
      return result;
    }
    throw new HttpException(
      'Email ou senha inválidos!',
      HttpStatus.PRECONDITION_FAILED,
    );
  }

  async login(user: any): Promise<{ user: any; access_token: string }> {
    const payload = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      lastName: user.dataValues.lastName,
      email: user.dataValues.email,
      role: user.dataValues.role,
    };
    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
