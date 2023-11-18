import { Controller, Get, Query } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';

@Controller('movies')
export class PeliculasController {
    constructor(private readonly peliculasService: PeliculasService) { }

    @Get('list')
    async fetchMovies(@Query('page') page: number) {
        return await this.peliculasService.fetchMovies(page);
    }

    @Get('getById')
    async getMovieById(@Query('id') id: string) {
        return await this.peliculasService.getMovieById(id);
    }

    @Get('random')
    async getRandomMovies() {
        return await this.peliculasService.getRandomMovies();
    }

    @Get('search')
    async searchMovie(@Query('search') search: string){
        return await this.peliculasService.searchMovies(search);
    }
}
