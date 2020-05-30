import { AllPoll } from './args/allPoll.args';
import { Poll } from './poll.entity';
import { redis } from './../redis';
import { MyContext } from './../types/contexts';
import { async } from 'rxjs/internal/scheduler/async';
import { PollOptionRepository } from './pollOption.repository';
import { PollRepository } from './poll.repository';
import { PollInput } from './poll.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PollService {

    constructor(@InjectRepository(PollRepository)
    private readonly pollRepository: PollRepository,
        @InjectRepository(PollOptionRepository)
        private readonly pollOptionsRepository: PollOptionRepository
    ) { }

    async createPoll(userId: string, pollInput: PollInput): Promise<Boolean> {
        const { name, options } = pollInput
        const poll = await this.pollRepository.insert({ name, userId });
        ['option1,options']
        options.map(async (text) => {
            await this.pollOptionsRepository.insert({
                text,
                pollId: poll.raw[0].id,
                vote: 0
            })
        })


        return true;
    }

    async vote(pollOptionId: number, ctx: MyContext): Promise<Boolean> {
        const pollOption = await this.pollOptionsRepository.findOne({ where: { id: pollOptionId } });

        if (!pollOption) {
            return false;
        }
        const ip = ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;

        if (ip) {
            const hasIp = await redis.sismember(`${pollOption.pollId}`, ip);
            if (hasIp) {
                return false;
            }
        }
        await this.pollOptionsRepository.update({ id: pollOptionId }, { vote: pollOption.vote + 1 });

        await redis.sadd(`${pollOption.pollId}`, ip)
        return true;
    }


    async getPoll(id: number): Promise<Poll> {
        const poll= await this.pollRepository.findOne({ where: { id: id }, relations: ['pollOption'] });
        if(!poll){
            throw new NotFoundException();
        }
        return poll;
    }

    async myPoll(userId:string):Promise<Poll[]>{
        return await this.pollRepository.find({where:{userId}});
    }


    async allPoll(allPoll: AllPoll): Promise<Poll[]> {

        const { take, skip } = allPoll;
        return this.pollRepository.createQueryBuilder('poll')
        .innerJoinAndSelect('poll.pollOption', 'pollOption')
        .orderBy('poll.name', 'ASC')
        .take(take).skip(skip).getMany();
    }

    async deletePoll(id:number,ctx:MyContext):Promise<Boolean>{
        try{
            await this.pollRepository.delete({id:id});
            const ip = ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;
    await redis.srem(`${id}`,ip);
        }
        catch(error){
            console.log(error);
return false;
        }
return true;
       

    }
}
