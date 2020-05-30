import { MyContext } from './../types/contexts';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>{
     const context = GqlExecutionContext.create(ctx);
     const req=context.getContext().req;
     console.log('User Id',req.session.userId);
     return req.session.userId;

    }
  );