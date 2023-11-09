import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Username: string;

  @Column()
  Passwrd: string;

  @Column()
  Email: string;

  @Column()
  Rol: string;
}
