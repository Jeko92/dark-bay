import {
  Column,
  Entity,
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
  // TODO: replace with real DB relation once seller/user table is present
  @Column()
  seller!: string;

  @Column({ type: "datetime" })
  endDate!: Date;
}
