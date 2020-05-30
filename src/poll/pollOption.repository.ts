import { PollOption } from './pollOptions.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(PollOption)
export class PollOptionRepository extends Repository<PollOption>{

}