import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserjDto } from './dto/create-user-j.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserJDto } from './dto/update-user-j.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto | CreateUserjDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.User, Role.Admin)
  @Get('/profile')
  findOneProfile(@Request() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOneId(@Param('id') id: string) {
    return this.usersService.findOneId(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto | UpdateUserJDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.User, Role.Admin)
  @Patch('/profile')
  updateProfile(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto | UpdateUserJDto,
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
