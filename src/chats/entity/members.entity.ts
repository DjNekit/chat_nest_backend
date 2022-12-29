import { Column, Entity } from "typeorm";

@Entity()
export class Members {
  @Column()
  chat_id: number

  @Column()
  user_id: number
}