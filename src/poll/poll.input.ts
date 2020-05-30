import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class PollInput {

    @Field()
    name:string;
    
    @Field(()=>[String])
    options:string[];

}