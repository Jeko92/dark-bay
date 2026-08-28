import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({ description: 'Title of the auction', example: 'Vintage SNES' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @ApiProperty({
    description: 'Short Description of the Auction',
    example: '16Bit Video Console from the 90ies.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description!: string;

  @ApiProperty({
    description: 'Plain number, not a currency-formatted string',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  startingPrice!: number;

  // TODO: This one is temporary, identity should come from the JWT.
  @ApiProperty({
    description: 'Who is selling this item',
    example: 'Supermario',
  })
  @IsUUID()
  sellerId!: string;

  @ApiProperty({
    description: 'ISO 8601 date. Defaults to 3 days from creation if omitted.',
    example: '2026-09-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
