import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { Auction } from './entities/auction.entity';
import { Offer } from '../offers/entities/offer.entity';

@Module({
  // Offer is registered here (not OffersModule) so AuctionsService can load
  // the `offers` relation for currentPrice — importing OffersModule instead
  // would create a circular module dependency, since OffersModule already
  // imports AuctionsModule.
  imports: [TypeOrmModule.forFeature([Auction, Offer])],
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [AuctionsService],
})
export class AuctionsModule {}
