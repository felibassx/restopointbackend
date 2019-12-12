import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UserDto } from '../../dto/user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { messageGeneric } from '../../utils/texts.string';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
    ) {
    }

    async login(data: UserDto) {
        const { email, password } = data;
        const user = await this._userRepository.findOne({ where: { email } });

        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                messageGeneric.errorLoginUserPass,
                HttpStatus.BAD_REQUEST,
            );
        }

        return user.toResponseObject();

    }

    async getAll() {
        return await this._userRepository.find();
    }

    async getOne(id: number) {
        return await this._userRepository.findOne(id);
    }

    async create(userDto: UserDto) {

        const { email } = userDto;
        let user = await this._userRepository.findOne({ where: { email } });

        if (user) {
            throw new HttpException(messageGeneric.errorUserExist, HttpStatus.BAD_REQUEST);
        }

        if (!this.confirmPassword(userDto.password, userDto.passwordConfirm)) {
            throw new HttpException(messageGeneric.errorPasswordNoEqual, HttpStatus.BAD_REQUEST);
        }

        user = await this._userRepository.create(userDto);
        await this._userRepository.save(user);
        return user.toResponseObject(false);
    }

    async update(id: number, userDto: UserDto) {

        const user = new User();

        user.email = userDto.email;
        user.password = userDto.password;
        user.secret = userDto.secret;
        user.respSecret = userDto.respSecret;
        user.updateDate = new Date('2019-12-08');

        return await this._userRepository.update(id, user);

    }

    async delete(id: number) {

        return await this._userRepository.delete(id);
    }

    confirmPassword(pass: string, passConfirm: string) {
        if (pass === passConfirm) {
            return true;
        } else {
            return false;
        }
    }

}
