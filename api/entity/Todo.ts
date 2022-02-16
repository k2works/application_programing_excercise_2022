import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  code!: string;

  @Column("varchar")
  name!: string;

  @OneToMany(() => Todo, (todo) => todo.status)
  todos!: Todo[];
}
@Entity("todo")
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  title!: string;

  @Column("boolean")
  completed!: boolean;

  @Column("datetime")
  createdAt!: Date;

  @Column({ type: "datetime", nullable: true })
  completedAt!: Date | null;

  @Column({ type: "datetime", nullable: true })
  dueDate!: Date | null;

  @ManyToOne(() => Status, (status) => status.todos)
  status!: Status;
}
