import { IsNumber, IsPositive } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsPositive()
  amount!: number;

  // TODO: Check idf bidderID will be needed
}
