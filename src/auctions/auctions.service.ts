import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { addDays } from 'src/common/utils/addDays';
import { ConfigService } from '@nestjs/config';
import { Auction } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
    private readonly configService: ConfigService,
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
    return this.auctionsRepository.find();
  }

  findOne(id: string): Promise<Auction | null> {
    const auction = this.auctionsRepository.findOne({
      where: { id },
      relations: { seller: true },
      select: { seller: { id: true, username: true } },
    });
    if (!auction) {
      throw new NotFoundException(`Auction with id ${id} not found`);
    }
    return auction;
  }
}
