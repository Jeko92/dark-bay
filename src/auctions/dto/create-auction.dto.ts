import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description!: string;

  @IsNumber()
  @IsPositive()
  startPrice!: number;

  @IsNumber()
  @IsPositive()
  currentPrice!: number;
  // TODO: replace with real DB relation once seller/user table is present

  @IsString()
  @IsNotEmpty()
  seller!: string;

  @IsDate()
  endDate!: Date;
}
