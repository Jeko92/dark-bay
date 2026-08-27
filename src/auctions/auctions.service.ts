import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Injectable()
export class AuctionsService {
  create(_createAuctionDto: CreateAuctionDto) {
    return 'This action adds a new auction';
  }

  findAll() {
    return `This action returns all auctions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auction`;
  }
}
