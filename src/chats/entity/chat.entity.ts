import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./message.entity";
import { User } from "../../users/entity/user.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  creator_id: number

  @Column({ nullable: true, default: null })
  name: string | null

  @Column({ default: false })
  isPublic: boolean

  @OneToMany(() => Message, message => message.chat_id)
  messages: Message[]

  @ManyToMany(() => User, user => user.chats)
  members: User[]

  @CreateDateColumn()
  created_date: Date

  @UpdateDateColumn()
  updated_date: Date

  @DeleteDateColumn()
  delete_date: Date
}