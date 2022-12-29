import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  chat_id: number

  @Column()
  author_id: number

  @Column({ type: 'longtext' })
  content: string

  @CreateDateColumn()
  created_date: Date

  @UpdateDateColumn()
  updated_date: Date

  @DeleteDateColumn()
  delete_date: Date
}