import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PeliculasService {
    async fetchMovies(page: number) {
        try {
            const response = await axios.get('https://moviesdatabase.p.rapidapi.com/titles', {
                params: {
                    endYear: '2022',
                    info: 'mini_info',
                    startYear: '1990',
                    page,
                },
                headers: {
                    'X-RapidAPI-Key': "174aa06026msh011534ebd880cdfp152733jsnd5a6ad656f65",
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                },
            });
            return response.data.results;
        } catch (error) {
            throw error;
        }
    }
}
