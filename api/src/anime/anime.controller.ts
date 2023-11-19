import { Controller, Get, Query } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
    constructor(private readonly animeService: AnimeService) { }

    @Get('list')
    async getAnimeList(@Query('page') page: number) {
        const animeList = await this.animeService.getAnimeList(page);
        return animeList;
    }

    @Get('getById')
    async getAnimeById(@Query('id') id: number) {
        return this.animeService.getAnimeById(id);
    }

    @Get('search')
    async searchAnime(@Query('search') search: string) {
        try {
            const response = await this.animeService.searchAnime(search);
            return response;
        } catch (error) {
            throw new Error(`Error al buscar: ${error.message}`);
        }
    }
}
