import { Response as res } from 'express';
import { UserService } from './user.service';
import { Controller, Get, Param, Response } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get('/confirm/:id')
    confirmEmail(@Param('id')id:string,@Response() res:res){
        return this.userService.confirmEmail(id,res);
    }
}
