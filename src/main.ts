import { redis } from './redis';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import session = require('express-session');
import * as store from 'connect-redis';

dotenv.config();
async function bootstrap() {

  const RedisStore= store(session)
  const app = await NestFactory.create(AppModule);
  app.use(session({
    store: new RedisStore({ client: redis as any, }),
    name:'votingapp',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly:true, secure: process.env.NODE_ENV === 'production', expires:new Date(Date.now() + 36000*1000*24), maxAge:36000*1000*24 },
  }),);
  await app.listen(3000);
}
bootstrap();

