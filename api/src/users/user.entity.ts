import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    Username: string;
    
    @Column()
    Password: string;
    
    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    CreatedAt: Date;
}