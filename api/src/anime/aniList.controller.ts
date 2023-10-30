import { Controller, Get, Query } from '@nestjs/common';
import { AnimeService } from './aniList.service';

@Controller('anime')
export class AnimeController {
    constructor(private readonly animeService: AnimeService) { }

    @Get('list')
    async getAnimeList(@Query('page') page: number) {
        const animeList = await this.animeService.getAnimeList(page);
        return animeList;
    }
}
