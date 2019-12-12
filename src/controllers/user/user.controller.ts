import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { response } from 'express';
import { messageGeneric } from '../../utils/texts.string';
import { UserDto } from '../../dto/user-dto';

@Controller('user')
export class UserController {
    constructor(
        private _usersService: UsersService,
    ) { }

    @Get()
    getAll(@Res() response) {
        this._usersService.getAll()
            .then(
                resp => {
                    response.status(HttpStatus.OK).json(
                        {
                            ok: true,
                            resp,
                            mensaje: messageGeneric.okMsgGetData
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
                            mensaje: messageGeneric.errorHttpNoDataPlu
                        }
                    );
                },
            );
    }

    @Get(':id')
    getOne(@Res() response, @Param('id') id) {
        this._usersService.getOne(id)
            .then(
                resp => {

                    resp.password = '--';
                    resp.secret = '--';
                    resp.respSecret = '--';
                    
                    response.status(HttpStatus.OK).json(
                        {
                            ok: true,
                            resp,
                            mensaje: messageGeneric.okMsgGetData
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
                            mensaje: messageGeneric.errorHttpNoDataSin
                        }
                    );
                },
            );
    }

    @Post()
    create(@Res() response, @Body() _dto: UserDto) {
        this._usersService.create(_dto)
            .then(
                resp => {
                    response.status(HttpStatus.OK).json(
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

    @Put(':id')
    update(@Res() response, @Body() _dto: UserDto, @Param(':id') id) {
        this._usersService.update(id, _dto)
        .then(
            resp => {
                response.status(HttpStatus.OK).json(
                    {
                        ok: true,
                        resp,
                        mensaje: messageGeneric.okMsgUpdate
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
                        mensaje: messageGeneric.errorMsgUpdate
                    }
                );
            },
        );
    }

    @Delete(':id')
    deletePage(@Res() response, @Param('id') id) {
        this._usersService.delete(id)
        .then(
            resp => {
                response.status(HttpStatus.OK).json(
                    {
                        ok: true,
                        resp,
                        mensaje: messageGeneric.okMsgDelete
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
                        mensaje: messageGeneric.errorMsgDelete
                    }
                );
            },
        );
    }
}
