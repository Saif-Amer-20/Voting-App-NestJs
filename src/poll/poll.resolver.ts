import { PollOption } from './pollOptions.entity';
import { AllPoll } from './args/allPoll.args';
import { Poll } from './poll.entity';
import { MyContext } from './../types/contexts';
import { PollService } from './poll.service';
import { PollInput } from './poll.input';
import { AuthGuard } from './auth.guard';
import { Resolver, Mutation, Args, Context, Query, ResolveProperty, Root } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetUserId } from './getUserId.decorator';

@Resolver(()=>Poll)
export class PollResolver {

    constructor(private readonly pollService:PollService){}

    @Mutation(()=>Boolean)
    @UseGuards(AuthGuard)
    async CreatePoll(@GetUserId()userId:string,@Args('Poll_Input') pollInput:PollInput):Promise<Boolean>{

        console.log('User Id',userId)
        return this.pollService.createPoll(userId,pollInput);
    }


    @Mutation(()=>Boolean)
    @UseGuards(AuthGuard)
    async Vote(@Context()ctx:MyContext,@Args('pollOptionId') pollOptionId:number):Promise<Boolean>{

        return this.pollService.vote(pollOptionId,ctx);
    }

    @Query(()=>Poll)
    async GetPoll(@Args('id')id:number):Promise<Poll>{
return this.pollService.getPoll(id);
    }


    @Query(()=>[Poll])
    async AllPoll(@Args()allPoll:AllPoll):Promise<Poll[]>{
return this.pollService.allPoll(allPoll);
    }

    @Mutation(()=>Boolean)
    async DeletePoll(@Context()ctx:MyContext,@Args('id')id:number):Promise<Boolean>{
        return this.pollService.deletePoll(id,ctx);
    }

    @Query(()=>[Poll])
    async MyPoll(@GetUserId()userId:string):Promise<Poll[]>{
return this.pollService.myPoll(userId);
    }

    @ResolveProperty('pollOption')
    async pollOption(@Root()poll:Poll,@Context()ctx:MyContext):Promise<PollOption[]>{
        return await ctx.pollOptionLoader.load(poll.id);
    }


}
