import { Controller, Get, Query } from '@nestjs/common';
import { TriviaService } from './trivia.service';

@Controller('trivia')
export class TriviaController {
    constructor(private readonly TriviaService: TriviaService) { }

    @Get('list')
    async fetchPreguntas() {//@Query('categoria') categoria: string
        return await this.TriviaService.fetchPreguntas();
    }
}