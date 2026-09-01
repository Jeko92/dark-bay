import { FindOperator, LessThanOrEqual, MoreThan } from 'typeorm';

export type AuctionStatus = 'open' | 'closed';

export const isAuctionOpen = (endDate: Date): boolean => {
  return endDate > new Date();
};

export function getAuctionStatus(endDate: Date): AuctionStatus {
  return isAuctionOpen(endDate) ? 'open' : 'closed';
}

export function auctionStatusWhereClause(
  status: AuctionStatus,
): FindOperator<Date> {
  const now = new Date();
  return status === 'open' ? MoreThan(now) : LessThanOrEqual(now);
}
