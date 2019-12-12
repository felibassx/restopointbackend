import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Page } from '../../entities/page.entity';
import { PageDto } from 'src/dto/page-dto';

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(Page)
        private readonly _pageRepository: Repository<Page>,
    ) {}

    // Obtener todas las páginas
    async getAll() {
        return await this._pageRepository.find();
    }

    // buscar por ID
    async getPage(id: number) {
        return await this._pageRepository.findOne(id);
    }

    // createPage
    async createPage( page: PageDto) {

        const newPage = new Page();
        
        newPage.pageTitle = page.pageName;
        newPage.pageUrl = page.pageUrl;

        return await this._pageRepository.save(newPage);
    }

    // Actualizar página
    async updatePage(id: number, page: PageDto) {

        const updPage =  await this._pageRepository.findOne(id);
        
        updPage.pageTitle = page.pageName;
        updPage.pageUrl = page.pageUrl;
        updPage.updateDate = new Date();

        return await this._pageRepository.update(id, updPage);

    }

    // Eliminar página
    async deletePage(id: number) {
        return await this._pageRepository.delete(id);
    }

}
