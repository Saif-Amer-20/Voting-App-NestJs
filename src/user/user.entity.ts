import { Poll } from './../poll/poll.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity('Users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    userName:string;
 
    @Column()
    email:string;

    @Column()
    password:string;

    @Column({default:false})
    confirmed:boolean;

    @OneToMany(()=>Poll,poll=>poll.user)
    poll:Promise<Poll[]>
}