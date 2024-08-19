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
import { AuctionsModule } from '../auctions/auctions.module';
import { CategoriesModule } from '../categories/categories.module';
import { AuctionItemsModule } from '../auction_items/auction_items.module';
import { BidsModule } from '../bids/bids.module';
//models
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Address } from '../addresses/entities/address.entity';
import { Auction } from '../auctions/entities/auction.entity';
import { Category } from '../categories/entities/category.entity';
import { AuctionItem } from '../auction_items/entities/auction_item.entity';
import { Bid } from '../bids/entities/bid.entity';

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
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    AddressesModule,
    AuctionsModule,
    CategoriesModule,
    AuctionItemsModule,
    BidsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
