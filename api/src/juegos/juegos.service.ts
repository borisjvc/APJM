import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JuegosService {


    async getGames(page: number) {
        const apiKey = '2c4b96636c7e4ca2ba106024b589569f';
        try {
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

    async getGamesById(id: number) {
        const apiKey = '2c4b96636c7e4ca2ba106024b589569f';
        try {
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
