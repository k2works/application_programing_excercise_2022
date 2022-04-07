import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column("varchar")
  firstName: string | undefined;

  @Column("varchar")
  lastName: string | undefined;

  @Column("integer")
  age: number | undefined;
}
