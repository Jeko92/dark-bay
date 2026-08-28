import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { addDays } from 'src/common/utils/add-days';
import { ConfigService } from '@nestjs/config';
import { Auction } from './entities/auction.entity';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { plainToInstance } from 'class-transformer';
import { AuctionQueryDto } from './dto/auction-query.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionsRepository: Repository<Auction>,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createAuctionDto: CreateAuctionDto,
  ): Promise<AuctionResponseDto> {
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

    const saved = await this.auctionsRepository.save(auction);
    return plainToInstance(AuctionResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    query: AuctionQueryDto,
  ): Promise<{ data: AuctionResponseDto[]; meta: PaginationQueryDto }> {
    const { page = 1, limit = 10, status, minPrice, maxPrice } = query;

    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Auction> = {
      ...(status && { endDate: auctionStatusWhereClause(status) }),
    };

    if (minPrice !== undefined && maxPrice !== undefined) {
      where.startingPrice = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.startingPrice = MoreThanOrEqual(minPrice);
    } else if (maxPrice !== undefined) {
      where.startingPrice = LessThanOrEqual(maxPrice);
    }

    const [auctions, total] = await this.auctionsRepository.findAndCount({
      where,
      relations: { seller: true },
      skip,
      take: limit,
      order: { endDate: 'DESC' },
    });

    const data = plainToInstance(AuctionResponseDto, auctions, {
      excludeExtraneousValues: true,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(
    id: string,
  ): Promise<{ data: AuctionResponseDto; meta: PaginationQueryDto }> {
    const auction = await this.auctionsRepository.findOne({
      where: { id },
      relations: { seller: true },
    });
    if (!auction) {
      throw new NotFoundException(`Auction with id ${id} not found`);
    }
    const data = plainToInstance(AuctionResponseDto, auction, {
      excludeExtraneousValues: true,
    });

    return {
      data: data,
      meta: {
        page,
        limit,
        // total,
        // totalPages: Math.ceil(total / limit)
      },
    };
  }
}
