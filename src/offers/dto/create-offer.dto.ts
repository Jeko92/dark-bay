import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ description: 'Plain number, not a currency-formatted string', example: 100 })
  @IsNumber()
  @IsPositive()
  amount!: number;

  // TODO: Check idf bidderID will be needed
}
