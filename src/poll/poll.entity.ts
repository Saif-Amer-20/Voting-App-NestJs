import { ObjectType, Field } from '@nestjs/graphql';
import { PollOption } from './pollOptions.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/user/user.entity";

@ObjectType()
@Entity()
export class Poll{

    @Field()
    @PrimaryGeneratedColumn()
    id:number;
    @Field()
    @Column()
    name:string;
    @Field()
    @Column()
    userId:string;

    @ManyToOne(()=>User,user=>user.poll)
    user:Promise<User>

    @Field(()=>[PollOption])
    @OneToMany(()=>PollOption,pollOption=>pollOption.poll)
    pollOption:Promise<PollOption[]>
}