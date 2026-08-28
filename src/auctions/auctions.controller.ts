import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { ApiOperation } from 'node_modules/@nestjs/swagger/dist/decorators/api-operation.decorator';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuctionQueryDto } from './dto/auction-query.dto';
import type { RequestWithUser } from 'src/auth/request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @ApiOperation({ summary: 'Create a new auction' })
  @ApiOkResponse({ description: 'The auction has been successfully created.' })
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createAuctionDto: CreateAuctionDto,
    @Req() req: RequestWithUser,
  ) {
    return this.auctionsService.create(createAuctionDto, req.user.id);
  }

  @ApiOperation({ summary: 'Get all auctions' })
  @ApiOkResponse({ description: 'Returns a list of all auctions.' })
  @Public()
  @Get()
  findAll(@Query() query: AuctionQueryDto) {
    return this.auctionsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get a specific auction by ID' })
  @ApiOkResponse({ description: 'Returns the auction with the specified ID.' })
  @ApiNotFoundResponse({ description: 'Auction not found.' })
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.auctionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete an auction' })
  @ApiNoContentResponse({ description: 'The auction has been deleted.' })
  @ApiNotFoundResponse({ description: 'Auction not found.' })
  @ApiForbiddenResponse({
    description: 'Only the auction owner or an admin can delete this auction.',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: RequestWithUser) {
    return this.auctionsService.remove(id, req.user);
  }
}
