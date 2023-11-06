import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TriviaService {

    async fetchPreguntas(categoria?: number, diff?: string, tipo?: string) {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple');
            return response.data;
        } catch (error) {
            throw new Error(`Error al obtener preguntas de trivia: ${error.message}`);
        }
    }
}