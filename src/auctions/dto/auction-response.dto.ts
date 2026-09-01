import { Expose, Type } from 'class-transformer';
import { UserSummaryDto } from '../../users/dto/user-summary.dto';

export class AuctionResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  startingPrice!: number;

  @Expose()
  endDate!: Date;

  @Expose()
  @Type(() => UserSummaryDto)
  seller!: UserSummaryDto;

  @Expose()
  createdAt!: Date;
}
