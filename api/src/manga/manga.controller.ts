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
            throw new Error(`Failed to fetch manga list: ${error.message}`);
        }
    }
}
