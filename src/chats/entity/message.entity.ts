import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat

  @Column()
  author_id: number

  @Column({ type: 'longtext' })
  content: string

  @Column({ default: 'unread' })
  status: 'read' | 'unread' | 'delete'

  @CreateDateColumn()
  created_date: Date

  // @UpdateDateColumn()
  // updated_date: Date

  // @DeleteDateColumn()
  // delete_date: Date
}