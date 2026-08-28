import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Auction } from '../auctions/entities/auction.entity';
import { Offer } from '../offers/entities/offer.entity';
import { User } from '../users/entities/user.entity';

config({ quiet: true });

const dbFile = process.env['DB_FILE'];
if (!dbFile) {
  throw new Error('Missing required environment variable: DB_FILE');
}

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: dbFile,
  entities: [Auction, Offer, User],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: true,
  enableWAL: true,
});
