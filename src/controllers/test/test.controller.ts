import { Controller, Get, Res, HttpStatus, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PagesService } from '../../services/pages/pages.service';
import { PageDto } from 'src/dto/page-dto';

@Controller('test')
export class TestController {

    constructor(
        private _pagesServices: PagesService,
    ) {}

    @Get()
    getAll(@Res() response) {
        this._pagesServices.getAll()
        .then(
            pages => {
                response.status(HttpStatus.OK).json(pages);
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.NO_CONTENT).json({resp, mensaje: 'Error, no se encontraron datos'});
            },
        );
    }

    @Get(':id')
    getPage(@Res() response, @Param('id') idPage) {
        this._pagesServices.getPage(idPage)
        .then(
            page => {
                response.status(HttpStatus.OK).json(page);
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.NO_CONTENT).json({resp, mensaje: 'Error, no se buscar la página'});
            },
        );
    }

    @Post()
    createPage(@Res() response, @Body() _pageDto: PageDto) {
        this._pagesServices.createPage(_pageDto)
        .then(
            resp => {
                response.status(HttpStatus.CREATED).json({resp, mensaje: 'Página creada con éxito'});
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.FORBIDDEN).json({resp, mensaje: 'Error en la creación de la página'});
            },
        );
    }

    @Put(':id')
    updatePage(@Res() response, @Body() _pageDto: PageDto, @Param(':id') idPage) {
        this._pagesServices.updatePage(idPage, _pageDto)
        .then(
            resp => {
                response.status(HttpStatus.OK).json(resp);
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.FORBIDDEN).json({resp, mensaje: 'Error, en la edición de la página'});
            },
        );
    }

    @Delete(':id')
    deletePage(@Res() response, @Param('id') idPage) {
        this._pagesServices.deletePage(idPage)
        .then(
            resp => {
                response.status(HttpStatus.OK).json(resp);
            },
        )
        .catch(
            resp => {
                response.status(HttpStatus.FORBIDDEN).json({resp, mensaje: 'Error, en la eliminación de la página'});
            },
        );
    }

}
