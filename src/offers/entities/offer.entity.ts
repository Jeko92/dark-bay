import { Auction } from 'src/auctions/entities/auction.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  amount!: number;

  @ManyToOne(() => User)
  bidder!: User;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @ManyToOne(() => Auction, (auction) => auction.offers, {
    onDelete: 'CASCADE',
  })
  auction!: Auction;
}
