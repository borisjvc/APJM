import { Controller, Get, Query, Header } from '@nestjs/common';
import axios from 'axios';

@Controller('games')
export class SteamController {
    @Get()
    @Header('Access-Control-Allow-Origin', '*')
    async getGames(@Query('page') page: number) {
        try {
            const apiKey = '2c4b96636c7e4ca2ba106024b589569f';
            let response;
            if (page < 2) {
                response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);
            } else {
                response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}`);
            }
            return response.data.results;
        } catch (error) {
            throw error;
        }
    }
}
