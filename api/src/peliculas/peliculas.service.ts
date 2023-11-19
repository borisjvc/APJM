import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PeliculasService {
    private readonly apiKey = '174aa06026msh011534ebd880cdfp152733jsnd5a6ad656f65';

    async fetchMovies(page: number) {
        try {
            let response;
            response = await axios.get('https://moviesdatabase.p.rapidapi.com/titles', {
                params: {
                    endYear: '2023',
                    info: 'mini_info',
                    startYear: '1990',
                    page,
                    titleType: 'movie',
                    sort: 'year.decr',
                },
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                },
            });
            return response.data.results;
        } catch (error) {
            throw new Error(`Error al obtener lista de peliculas: ${error.message}`);
        }
    }

    async getMovieById(id: string) {
        try {
            const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${id}`, {
                params: {
                    info: 'base_info',
                },
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                },
            });
            return response.data.results;
        } catch (error) {
            throw new Error(`Error al obtener lista de peliculas: ${error.message}`);
        }
    }

    async getRandomMovies() {
        try {
            const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/random`, {
                params: {
                    list: 'most_pop_movies',
                },
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                },
            });
            return response.data.results;
        } catch (error) {
            throw new Error(`Error al obtener lista de peliculas random: ${error.message}`);
        }
    }


    async searchMovies(search: string) {
        try {
            const response = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${search}`, {
                headers: {
                    'X-RapidAPI-Key': this.apiKey,
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                },
            });
            return response.data.results;
        } catch (error) {
            throw new Error(`Error al buscar peliculas: ${error.message}`);
        }

    }
}
