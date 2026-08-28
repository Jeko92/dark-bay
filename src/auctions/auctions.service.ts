import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { addDays } from 'src/common/utils/addDays';
import { ConfigService } from '@nestjs/config';
import { Auction } from './entities/auction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuctionsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly auctionsRepository: Repository<Auction>,
  ) {}

  create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const defaultDurationDays = Number(
      this.configService.getOrThrow<string>('DEFAULT_AUCTION_DURATION_DAYS'),
    );
    const endDate = createAuctionDto.endDate
      ? new Date(createAuctionDto.endDate)
      : addDays(new Date(), defaultDurationDays);

    const { sellerId, ...rest } = createAuctionDto;
    const auction = this.auctionsRepository.create({
      ...rest,
      endDate,
      seller: { id: sellerId } as Auction['seller'],
    });

    return this.auctionsRepository.save(auction);
  }

  findAll(): Promise<Auction[]> {
    const auctions = this.auctionsRepository.find({
      //TODO: Add relations to fetch seller and offers, but be careful with performance and data size.
    });
    return auctions;
  }

  findOne(id: string): Promise<Auction | null> {
    const auction = this.auctionsRepository.findOne({
      where: { id },
      //TODO: Add relations to fetch seller and offers, but be careful with performance and data size.
    });
    if (!auction) {
      throw new NotFoundException(`Auction with id ${id} not found`);
    }
    return auction;
  }
}
