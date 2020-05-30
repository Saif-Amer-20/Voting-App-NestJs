import { Poll } from './poll.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Poll)
export class PollRepository extends Repository<Poll>{

}