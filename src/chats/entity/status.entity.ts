import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Status {
  @PrimaryColumn()
  message_id: number

  @Column()
  user_id: number

  @Column()
  status: 'read' | 'unread' | 'delete'
}