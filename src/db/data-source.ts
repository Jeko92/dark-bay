import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Auction } from '../auctions/entities/auction.entity';
import { Offer } from '../offers/entities/offer.entity';
import { User } from '../users/entities/user.entity';
import { Watchlist } from '../watchlist/entities/watchlist.entity';

config({ quiet: true });

const databaseUrl = process.env['DATABASE_URL'];
if (!databaseUrl) {
  throw new Error('Missing required environment variable: DATABASE_URL');
}

// Prefer Render's Internal Database URL for the deployed app: internal
// connections stay on Render's private network and don't need SSL at all
// (leave DATABASE_SSL unset). Only set DATABASE_SSL=true for an external
// connection (e.g. connecting from outside Render, like a local machine).
// rejectUnauthorized is disabled here because that's the common case for
// hosted Postgres where the full CA chain isn't in Node's trust store —
// it trades away MITM protection for convenience. For a stronger setup,
// download the provider's CA certificate and pass it as `ca` instead.
const useSsl = process.env['DATABASE_SSL'] === 'true';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
  entities: [Auction, Offer, User, Watchlist],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
});
