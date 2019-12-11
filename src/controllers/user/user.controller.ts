import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { response } from 'express';
import { messageGeneric } from '../../utils/texts.string';
import { UserDto } from '../../dto/user-dto';

@Controller('user')
export class UserController {
    constructor(
        private _usersService: UsersService,
    ) {}

    @Get()
    getAll(@Res() response) {
        this._usersService.getAll()
            .then(
                registers => {

                    if (!registers) {
                        response.status(HttpStatus.SERVICE_UNAVAILABLE).json({ registers, message: messageGeneric.errorHttpNoDataPlu });
                    } else {
                        response.status(HttpStatus.OK).json(registers);
                    }
                },
            )
            .catch(
                resp => {
                    response.status(HttpStatus.NO_CONTENT).json({ resp, message: messageGeneric.errorHttpNoDataPlu });
                },
            );
    }

    @Get(':id')
    getOne(@Res() response, @Param('id') id) {
        this._usersService.getOne(id)
            .then(
                resp => {
                    response.status(HttpStatus.OK).json(resp);
                },
            )
            .catch(
                resp => {
                    response.status(HttpStatus.NO_CONTENT).json({resp, message: messageGeneric.errorHttpNoDataSin});
                },
            );
    }

    @Post()
    create(@Res() response, @Body() _dto: UserDto) {
        this._usersService.create(_dto)
        .then(
            resp => {
                response.status(HttpStatus.CREATED).json({resp, message: messageGeneric.okMsgInsert});
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.FORBIDDEN).json({resp, message: messageGeneric.errorMsgInsert});
            },
        );     
    }

    @Put(':id')
    update(@Res() response, @Body() _dto: UserDto, @Param(':id') id) {
        this._usersService.update(id, _dto)
        .then(
            resp => {
                response.status(HttpStatus.OK).json({resp, message: messageGeneric.okMsgUpdate});
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.FORBIDDEN).json({resp, message: messageGeneric.errorMsgUpdate});
            },
        );
    }

    @Delete(':id')
    deletePage(@Res() response, @Param('id') id) {
        this._usersService.delete(id)
        .then(
            resp => {
                response.status(HttpStatus.OK).json({resp, message: messageGeneric.okMsgDelete});
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.FORBIDDEN).json({resp, mensaje: messageGeneric.errorMsgDelete});
            },
        );
    }
}
