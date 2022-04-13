import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { StatusEntity } from "./StatusEntity";

@Entity("todo")
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  title!: string;

  @Column("boolean")
  completed!: boolean;

  @Column({ type: "datetime", nullable: true })
  dueDate!: Date | null;

  @Column("datetime")
  createdAt!: Date;

  @Column({ type: "datetime", nullable: true })
  completedAt!: Date | null;

  @Column("varchar")
  status!: string;

  @ManyToOne(() => StatusEntity, (status) => status.todos)
  status2!: StatusEntity;
}
