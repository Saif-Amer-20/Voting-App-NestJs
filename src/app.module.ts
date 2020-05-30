import { PollOptionLoader } from './loader/pollOption.loader';
import { TypeOrmConfig } from './config/typeormconfig';
import { Module } from '@nestjs/common';

import {GraphQLModule} from '@nestjs/graphql'
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { PollModule } from './poll/poll.module';
@Module({
  imports: [

TypeOrmModule.forRoot(TypeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile:true //'schema.gql'
      ,
      context:({req,res})=>({req,res,pollOptionLoader:PollOptionLoader()})
      
    }),

    UserModule,

    PollModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
