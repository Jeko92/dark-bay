import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Auction } from '../auctions/entities/auction.entity';

config({ quiet: true });

const dbFile = process.env['DB_FILE'];
if (!dbFile) {
  throw new Error('Missing required environment variable: DB_FILE');
}

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: dbFile,
  entities: [Auction],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: true,
  enableWAL: true,
});
