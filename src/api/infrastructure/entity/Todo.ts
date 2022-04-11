import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("todo")
export class Todo extends BaseEntity {
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
}
