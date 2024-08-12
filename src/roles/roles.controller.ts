import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @Post()
  // create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.rolesService.create(createRoleDto);
  // }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(+id);
  // }
}
