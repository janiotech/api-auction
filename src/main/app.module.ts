import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
//modules
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { AddressesModule } from '../addresses/addresses.module';
import { AuctionsModule } from 'src/auctions/auctions.module';
//models
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Address } from '../addresses/entities/address.entity';
import { Auction } from '../auctions/entities/auction.entity';

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
      timezone: '+00:00',
      dialectOptions: {
        timezone: 'Etc/UTC', // Garante que o banco de dados opera em UTC
      },
      autoLoadModels: true,
      synchronize: true,
      models: [User, Role, Address, Auction],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    AddressesModule,
    AuctionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
