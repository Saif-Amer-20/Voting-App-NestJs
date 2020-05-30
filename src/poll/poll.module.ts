import { PollOptionRepository } from './pollOption.repository';
import { PollRepository } from './poll.repository';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollResolver } from './poll.resolver';
import { PollService } from './poll.service';

@Module({imports:[TypeOrmModule.forFeature([PollRepository,PollOptionRepository])], providers: [PollResolver, PollService]})
export class PollModule {
    
}
