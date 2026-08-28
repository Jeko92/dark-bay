import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!:string;

  @Column()
  description!: string;

  @Column()
  startPrice!: number;

  @Column()
  currentPrice!: number;

  @ManyToOne(() => Offer, (offer) => offer.auction)
  offers!: Offer[];

  @ManyToOne(() => User)
  seller!: User;

  @Column({ type: "datetime" })
  endDate!: Date;
}
