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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Roles(Role.User, Role.Admin)
  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Request() req: any) {
    return this.addressesService.create(req.user.id, createAddressDto);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Roles(Role.User, Role.Admin)
  @Patch('/edit')
  update(@Body() updateAddressDto: UpdateAddressDto, @Request() req: any) {
    return this.addressesService.update(req.user.id, updateAddressDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
