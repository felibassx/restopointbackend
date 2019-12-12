import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Employee } from './employee.entity';
import { Role } from './role.entity';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRO } from 'src/dto/user-dto';
import { Logger } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  passwordConfirm: string;
  ok: boolean;
  message: string;

  @Column()
  secret: string;

  @Column()
  respSecret: string;

  @Column()
  active: boolean = true;

  @Column()
  cratedDate: Date = new Date();

  @Column()
  updateDate: Date = new Date();

  @OneToOne(type => Employee)
  @JoinColumn()
  employed: Employee;

  @OneToMany(type => Role, role => role.user)
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  async comparePassword2(fromapi: string, serverpass: string): Promise<boolean> {
    
    const encript = await bcrypt.hash(fromapi, 10);
    
    return await bcrypt.compare(encript, serverpass);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, cratedDate, email, token } = this;

    const responseObject: UserRO = {
      id,
      cratedDate,
      email
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, email } = this;

    const config = new ConfigService(`${process.env.NODE_ENV || 'development'}.env`);

    Logger.log(`SECRET ENV:  ${config.sercret}`, 'SECRET');

    return jwt.sign(
      {
        id,
        email,
      },
      config.sercret,
      { expiresIn: '7d' },
    );
  }

}
