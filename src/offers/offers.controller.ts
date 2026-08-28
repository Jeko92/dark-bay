import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfferService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { UserSummaryDto } from 'src/users/dto/user-summary.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiOperation({ summary: 'Create a new offer' })
  @ApiNotFoundResponse({ description: 'Auction not found.' })
  @ApiForbiddenResponse({ description: 'You are not allowed to create an offer for this auction.' })
  @ApiConflictResponse({ description: 'You have already placed an offer for this auction.' }) //TODO: Check wording
  @ApiCreatedResponse({ description: 'The offer has been successfully placed.' })
  @Post()
  placeOffer(
    @Body() createOfferDto: CreateOfferDto, 
    @Param ('auctionId') auctionId: string, 
    @Body('bidder') bidderId: string
  ) {
    const bidder = { id: bidderId } as UserSummaryDto;
    return this.offerService.placeOffer(auctionId, createOfferDto, bidder);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
