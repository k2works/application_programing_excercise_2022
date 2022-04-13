import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TodoEntity } from "./TodoEntity";

@Entity("status")
export class StatusEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  type!: string;

  @Column("varchar")
  code!: string;

  @Column("varchar")
  name!: string;

  @OneToMany(() => TodoEntity, (todo) => todo.status)
  todos!: TodoEntity[];
}
