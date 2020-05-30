import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Poll } from './poll.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@ObjectType()
@Entity()
export class PollOption{

    @Field()
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column('text')
    text:string;
    @Field()
    @Column('integer')
    vote:number;
    @Field()
    @Column('integer')
    pollId:number;

    @ManyToOne(()=>Poll,poll=>poll.pollOption,{onDelete:"CASCADE"})
    poll:Promise<Poll>


}