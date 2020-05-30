import { MyContext } from './../types/contexts';
import { LoginInput } from './input/login.input';
import { redis } from './../redis';
import { ConfirmEmailLink } from './../utils/confirmEmail';
import { SendEmail } from '../utils/sendEmail';
import { ErrorHandler } from './sheard/error-handel';
import { SingUpInput } from './input/singup.input';
import { UserRepository } from './user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

    constructor
    (@InjectRepository(UserRepository)
    private readonly userRepository:UserRepository
    ){}

    async signUp(signUpInput:SingUpInput):Promise<ErrorHandler[]|null>{
        const userExit=await this.userRepository.findOne({where:{email:signUpInput.email}});

        if(userExit){

            return[{
                path:"email",
                message:"Invalid UserName Or Password"
            }]
        }
      const user = await this.userRepository.save({...signUpInput});
      await SendEmail(signUpInput.email,await ConfirmEmailLink(user.id));
        return null;

    }

    async confirmEmail(id:string,res:Response){

        const userId=await redis.get(id);
        if(!userId){
            throw new NotFoundException();
        }

        await this.userRepository.update({id:userId},{confirmed:true});

        res.send('ok');

    }
    
    async login(loginInput:LoginInput,req:Request):Promise<ErrorHandler[]|null>{
        const user=await this.userRepository.findOne({where:{email:loginInput.email}});
        if(!user){
            return[{
                path:"email",
                message:"Invalid UserName Or Password"
            }]
        }

if(user.confirmed==false){
    return[{
        path:"email",
        message:"Invalid UserName Or Password"
    }]
}
        const checkPassword=await bcrypt.compare(loginInput.password,user.password);
        if(!checkPassword){
            return[{
                path:"email",
                message:"Invalid UserName Or Password"
            }]
        }
console.log(checkPassword);
        req.session.userId=user.id;

        return null;
    }
    

    async LogOut(ctx:MyContext){
      await  ctx.req.session.destroy(err => {
          console.log(err);
          return false;
      });

      await ctx.res.clearCookie('votingapp');
      return true;
    }
}

