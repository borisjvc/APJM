import { Controller, Get, Query } from '@nestjs/common';
import { MangaService } from './manga.service';

@Controller('manga')
export class MangaController {
    constructor(private readonly mangaService: MangaService) { }

    @Get('list')
    async getMangaList(@Query('page') page: number) {
        try {
            const mangaList = await this.mangaService.getMangaList(page);
            return mangaList;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    @Get('getById')
    async getMangaById(@Query('id') id: number ){
        try{
            const mangaInfo = await this.mangaService.getMangaById(id);
            return mangaInfo;
        }catch(error){
            throw new Error(`${error.message}`)
        }
    }

    @Get('search')
    async searchMangas(@Query('search') search: string){
        try{
            const mangaSearch = await this.mangaService.searchMangas(search);
            return mangaSearch;
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }
}
