import { Auction } from "src/auctions/entities/auction.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    amount!:number;

    @ManyToOne(() => User)
    bidder!: User;

    @Column({ type: "datetime" })
    createdAt!: Date;

    @ManyToOne(() => Auction, (auction) => auction.offers, {
        onDelete: 'CASCADE',
    })
    auction!: Auction;

}
