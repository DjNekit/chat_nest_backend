import { Entity } from "typeorm";

@Entity()
export class Status {
  message_id: number
  user_id: number
  status: 'read' | 'unread' | 'delete'
}