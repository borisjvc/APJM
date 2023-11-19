import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JuegosService {
    private readonly apiKey = '2c4b96636c7e4ca2ba106024b589569f';

    async getGames(page: number) {

        try {
            let response;
            if (page < 2) {
                response = await axios.get(`https://api.rawg.io/api/games?key=${this.apiKey}`);
            } else {
                response = await axios.get(`https://api.rawg.io/api/games?key=${this.apiKey}&page=${page}`);
            }

            return response.data.results;
        } catch (error) {
            throw new Error(`Error al obtener lista de juegos: ${error.message}`);
        }
    }

    async getGamesById(id: number) {
        try {
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${this.apiKey}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error al obtener datos del juego: ${error.message}`);
        }
    }

    async searchGames(search: string) {
        try {
            const response = await axios.get(`https://api.rawg.io/api/games?key=${this.apiKey}&search=${search}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error al buscar: ${error.message}`);
        }
    }
}
