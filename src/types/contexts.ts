import {  Request, Response } from 'express';
import * as DataLoader from 'dataLoader'
import { PollOption } from 'src/poll/pollOptions.entity';
export interface MyContext{
    req:Request;
    res:Response;
    pollOptionLoader:DataLoader<number,PollOption[]>

}