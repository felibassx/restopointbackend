import { IsNotEmpty } from 'class-validator';

export class UserDto {
    id: number; 
    
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    passwordConfirm: string;

    secret: string;
    respSecret: string;

}

export class UserRO {
    id: number;
    email: string;
    cratedDate: Date;    
    token?: string;
  }
