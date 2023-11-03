import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MangaService {
    async getMangaList(page: number) {
        let response;
        try {
            if (page < 2) {
                response = await axios.get(`https://api.myanimelist.net/v2/manga/ranking?ranking_type=all&limit=20`, {
                    headers: {
                        'X-MAL-CLIENT-ID': "323b060c728ec63f220488ff6b2f0cd3",
                    },
                });
            } else {
                response = await axios.get(` https://api.myanimelist.net/v2/manga/ranking?offset=${page * 20}&ranking_type=all&limit=20`, {
                    headers: {
                        'X-MAL-CLIENT-ID': "323b060c728ec63f220488ff6b2f0cd3",
                    },
                });
            }
            const mangaList = response.data;
            return mangaList;
        } catch (error) {
            throw new Error(`Error al obtener lista de manga: ${error.message}`);
        }
    }

    async getMangaById(id: number) {
        try {
            const response = await axios.get(`https://api.myanimelist.net/v2/manga/${id}?fields=main_picture, title, synopsis,start_date, status, num_chapters, related_manga, recommendations, genres`, {
                headers: {
                    'X-MAL-CLIENT-ID': "323b060c728ec63f220488ff6b2f0cd3",
                },
            });
            const mangaInfo = response.data;
            return mangaInfo;
        } catch (error) {
            throw new Error(`Error al obtener información del manga: ${error.message}`)
        }

    }
}
