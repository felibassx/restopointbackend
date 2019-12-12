import { Module } from '@nestjs/common';
import { PagesService } from './pages/pages.service';
import { UsersService } from './users/users.service';
import { TestService } from './test/test.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '../shared/http-error.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from 'src/entities/page.entity';
import { Employee } from '../entities/employee.entity';
import { Menu } from '../entities/menu.entity';
import { Option } from '../entities/option.entity';
import { Privilege } from '../entities/privilege.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, Employee, Menu, Option, Privilege, Role, User])
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    PagesService, UsersService, TestService
  ],
  exports: [PagesService, UsersService, TestService]
})
export class ServiceModule { }
