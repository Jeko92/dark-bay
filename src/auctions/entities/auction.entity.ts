import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  startingPrice!: number;

  @Column()
  endDate!: Date;

  @ManyToOne(() => User)
  seller!: User;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers!: Offer[];
}
