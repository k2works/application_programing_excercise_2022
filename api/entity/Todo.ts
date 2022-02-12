import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
