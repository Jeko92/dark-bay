import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRole = "admin" | "user";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({unique: true})
  username!: string

  @Column()
  passwordHash!: string

  @Column('simple-array', { default: 'user' })
  roles!: UserRole[]
}
