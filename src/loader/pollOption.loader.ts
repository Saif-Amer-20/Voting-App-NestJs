import { Poll } from './../poll/poll.entity';
import * as DataLoader from 'dataloader'
import { getRepository } from 'typeorm'

export const PollOptionLoader = () => new DataLoader(async (Keys: number[]) => {

    const poll= await getRepository(Poll).createQueryBuilder('poll').leftJoinAndSelect('poll.pollOption','pollOption').where('poll.id IN (:...Keys)',{Keys}).getMany();
    return  poll.map(poll=>poll.pollOption);
});