import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnimeService {
  private readonly aniListApiUrl = 'https://graphql.anilist.co';

  async getAnimeList(page: number) {
    const query = `
      query {
        Page(page: ${page}, perPage: 20) {
          media(type: ANIME) {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
          }
        }
      }
    `;

    try {
      const response = await axios.post(this.aniListApiUrl, { query });
      const animeList = response.data.data.Page.media;
      return animeList;
    } catch (error) {
      throw new Error(`Failed to fetch anime list: ${error.message}`);
    }
  }

  async getAnimeById(id: number) {
    const query = `
      query {
        Media(id: ${id}) {
          id
          title {
            romaji
          }
          description
          coverImage {
            large
          }
          startDate {
            year
          } 
          status
          episodes
          genres
        }
      }
    `;

    try {
      const response = await axios.post(this.aniListApiUrl, { query });
      const animeDetails = response.data.data.Media;
      return animeDetails;
    } catch (error) {
      throw new Error(`Error al obtener datos: ${error.message}`);
    }
  }

}
