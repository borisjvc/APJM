import { Controller, Get, Param } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';

@Controller('movies')
export class PeliculasController {
    constructor(private readonly peliculasService: PeliculasService) { }

    @Get(':page')
    async fetchMovies(@Param('page') page: number) {
        try {
            return this.peliculasService.fetchMovies(page);
        } catch (error) {
            throw error;
        }
    }
}
