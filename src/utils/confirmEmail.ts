import { redis } from './../redis';
import {v4 } from 'uuid'



export const ConfirmEmailLink= async  (userId:string)=>{

   const id=v4();
    console.log(id);
  await  redis.set(id,userId,'ex',60*60*15);
    return `http://localhost:3000/user/confirm/${id}`
}