import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("todo")
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  title!: string;

  @Column("boolean")
  completed!: boolean;
}
