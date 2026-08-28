import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { ApiOperation } from 'node_modules/@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuctionQueryDto } from './dto/auction-query.dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @ApiOperation({ summary: 'Create a new auction' })
  @ApiOkResponse({ description: 'The auction has been successfully created.' })
  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionsService.create(createAuctionDto);
  }

  @ApiOperation({ summary: 'Get all auctions' })
  @ApiOkResponse({ description: 'Returns a list of all auctions.' })
  @Get()
  findAll(@Query() query: AuctionQueryDto) {
    return this.auctionsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get a specific auction by ID' })
  @ApiOkResponse({ description: 'Returns the auction with the specified ID.' })
  @ApiNotFoundResponse({ description: 'Auction not found.' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.auctionsService.findOne(id);
  }
}
