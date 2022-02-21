import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Todo } from "./Todo";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  type!: string;

  @Column("varchar")
  code!: string;

  @Column("varchar")
  name!: string;

  @OneToMany(() => Todo, (todo) => todo.status)
  todos!: Todo[];
}
