import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UserSummaryDto } from 'src/users/dto/user-summary.dto';

@ApiTags('offers')
@Controller('auctions/:auctionId/offers')
export class OffersController {
  constructor ( private readonly offersService: OffersService ) {
  }

  @ApiOperation({ summary: 'Create a new offer' })
  @ApiNotFoundResponse({ description: 'Auction not found.' })
  @ApiForbiddenResponse({ description: 'You are not allowed to create an offer for this auction.' })
  @ApiConflictResponse({ description: 'You have already placed an offer for this auction.' }) //TODO: Check wording
  @ApiCreatedResponse({ description: 'The offer has been successfully placed.' })
  @Post()
  placeOffer (
    @Body() createOfferDto: CreateOfferDto,
    @Param('auctionId', ParseUUIDPipe) auctionId: string,
    @Body('bidder') bidderId: string
  ) {
    const bidder = { id: bidderId } as UserSummaryDto;
    return this.offersService.placeOffer(auctionId, createOfferDto, bidder);
  }

  @ApiOperation({ summary: 'Get all offers for an auction' })
  @ApiOkResponse({
    description: 'Returns all offers for the auction, newest first.',
  })
  @Get()
  findAllForAuction ( @Param('auctionId', ParseUUIDPipe) auctionId: string ) {
    return this.offersService.findAllForAuction(auctionId);
  }

  @ApiOperation({ summary: 'Get the current price of an auction' })
  @ApiOkResponse({
    description:
      'Returns the current highest offer, or the starting price if there are no offers yet.',
  })
  @Get('current-price')
  getCurrentPrice ( @Param('auctionId', ParseUUIDPipe) auctionId: string ) {
    return this.offersService.getCurrentPrice(auctionId);
  }
}
