import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class AllPoll{

    @Field()
    take:number;

    @Field()
    skip:number;
}