import { Controller, Get, Query } from '@nestjs/common';
import { JuegosService } from './juegos.service';

@Controller('games')
export class JuegosController {
    constructor(private readonly JuegosService: JuegosService) { }

    @Get('list')
    async getGames(@Query('page') page: number) {
        const gameList = await this.JuegosService.getGames(page);
        return gameList;
    }

    @Get('getById')
    async getGameById(@Query('id') id: number) {
        const gameInfo = await this.JuegosService.getGamesById(id);
        return gameInfo;
    }

    @Get('search')
    async searchGames(@Query('search') search: string) {
        const searchResult = await this.JuegosService.searchGames(search);
        return searchResult;
    }
}
