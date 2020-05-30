import { User } from './../user.entity';
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SingUpInput implements Partial<User>{

    @Field()
    userName:string;

    @Field()
    email:string;
    
    @Field()
    password:string;

}