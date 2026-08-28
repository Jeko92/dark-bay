import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionsModule } from './auctions/auctions.module';
import { OffersModule } from './offers/offers.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuctionsModule,
    OffersModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
