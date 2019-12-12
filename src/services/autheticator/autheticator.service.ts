import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserDto } from 'src/dto/user-dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AutheticatorService {

    constructor(
        private userRepository: Repository<User>,
    ) {}

    

}
