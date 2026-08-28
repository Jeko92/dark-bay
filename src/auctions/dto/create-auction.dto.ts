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
  startingPrice!: number;

  // TODO: This one is temporary, identity should come from the JWT.
  @IsUUID()
  sellerId!: string;

  // TODO: service defaults this to +3 days when no enddDate is provided.
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
