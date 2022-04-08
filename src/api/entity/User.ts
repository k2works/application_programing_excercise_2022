import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
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
