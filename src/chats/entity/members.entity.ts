import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Members {
  @PrimaryColumn()
  chat_id: number

  @PrimaryColumn()
  user_id: number
}