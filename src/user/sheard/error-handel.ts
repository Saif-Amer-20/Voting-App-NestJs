import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ErrorHandler{

    @Field()
    path:string;

    @Field()
    message:string;
}