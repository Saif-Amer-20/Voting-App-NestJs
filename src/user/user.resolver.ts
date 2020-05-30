import { YupValidationPipe } from './../pipes/yupValidationPipes';
import { MyContext } from './../types/contexts';
import { LoginInput } from './input/login.input';
import { Redis } from 'ioredis';
import { UserService } from './user.service';
import { SingUpInput } from './input/singup.input';
import { ErrorHandler } from './sheard/error-handel';
import { User } from './user.entity';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

@Resolver(User)
export class UserResolver {
constructor(private readonly userService:UserService){}
    @Query(returns=>String)
    helloWorld(){
        return 'hello world'
    }

    @Mutation(returns=>[ErrorHandler],{nullable:true})
   async signUp(@Args('singUpInput') singUpInput:SingUpInput):Promise<ErrorHandler[]|null>{

   
        return this.userService.signUp(singUpInput);
    }

    @Mutation(returns=>[ErrorHandler],{nullable:true})
   async Login(@Args('LoginInput') loginInput:LoginInput,@Context() ctx:MyContext):Promise<ErrorHandler[]|null>{

   
        return this.userService.login(loginInput,ctx.req);
    }

    @Mutation(returns=>Boolean)
    async LogOut(@Context() ctx:MyContext){
 
    
         return this.userService.LogOut(ctx);
     }
}
