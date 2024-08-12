import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
//modules
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
//models
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'auction',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Role],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
