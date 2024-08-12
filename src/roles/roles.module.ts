import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
