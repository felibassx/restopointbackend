import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './controllers/test/test.controller';

import { User } from './entities/user.entity';
import { Employee } from './entities/employee.entity';
import { Role } from './entities/role.entity';
import { Menu } from './entities/menu.entity';
import { Option } from './entities/option.entity';
import { Privilege } from './entities/privilege.entity';
import { Page } from './entities/page.entity';
import { UserController } from './controllers/user/user.controller';
import { AuthenticatorController } from './controllers/authenticator/authenticator.controller';
import { ServiceModule } from './services/service.module';
import 'dotenv/config';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ServiceModule,
    ConfigModule,
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'pipexx221',
      database: 'restpoint',
      entities:  [
        Page,
        User,
        Employee,
        Role,
        Menu,
        Option,
        Privilege
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature(
      [
        Page,
        User,
        Employee,
        Role,
        Menu,
        Option,
        Privilege
      ]
    ),
  ],
  controllers: [AppController, TestController, UserController, AuthenticatorController],
  providers: [AppService],
})
export class AppModule { }
