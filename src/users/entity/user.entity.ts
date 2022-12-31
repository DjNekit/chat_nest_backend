import { Chat } from "src/chats/entity/chat.entity";
import { Column, Entity, JoinTable, Long, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'longtext', nullable: true, default: null })
  refreshToken: string | null;

  @ManyToMany(() => Chat, chat => chat.members)
  @JoinTable()
  chats: Chat[]
}
