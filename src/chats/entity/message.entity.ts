import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class Message {
  @PrimaryColumn()
  id: string

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