import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  // @OneToMany()
  // messages

  @CreateDateColumn()
  created_date: Date

  @UpdateDateColumn()
  updated_date: Date

  @DeleteDateColumn()
  delete_date: Date
}