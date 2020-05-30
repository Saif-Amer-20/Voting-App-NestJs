import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const TypeOrmConfig : TypeOrmModuleOptions= {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'saif1234',
    database: 'Votingapp',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    subscribers:[__dirname + '/../subscribes/*.subscribe{.ts,.js}']
  };