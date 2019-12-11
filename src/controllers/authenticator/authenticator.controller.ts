import { Controller, ValidationPipe, Post, UsePipes, Body, Res, HttpStatus } from '@nestjs/common';
import { UserDto } from '../../dto/user-dto';
import { UsersService } from '../../services/users/users.service';
import { messageGeneric } from '../../utils/texts.string';

@Controller('auth')
export class AuthenticatorController {

    constructor(private _usersService: UsersService) { }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    login(@Res() response, @Body() data: UserDto) {
        // return ;

        return this._usersService.login(data)
            .then(
                resp => {
                    response.status(HttpStatus.CREATED).json(
                        {
                            ok: true,
                            resp,
                            mensaje: ''
                        }
                    );
                },
            )
            .catch(
                resp => {
                    response.status(HttpStatus.FORBIDDEN).json(
                        {
                            ok: false,
                            resp,
                            mensaje: messageGeneric.errorLoginUserPass
                        }
                    );
                },
            );
    }

    @Post('/register')
    @UsePipes(new ValidationPipe())
    register(@Res() response, @Body() user: UserDto) {
        return this._usersService.create(user)
            .then(
                resp => {
                    response.status(HttpStatus.CREATED).json(
                        {
                            ok: true,
                            resp,
                            mensaje: messageGeneric.okMsgInsert
                        }
                    );
                },
            )
            .catch(
                resp => {
                    response.status(HttpStatus.FORBIDDEN).json(
                        {
                            ok: false,
                            resp,
                            mensaje: messageGeneric.errorMsgInsert
                        }
                    );
                },
            );
    }
}
