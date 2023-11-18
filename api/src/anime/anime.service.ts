import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AnimeService {
  private readonly aniListApiUrl = 'https://graphql.anilist.co';

  async getAnimeList(page: number) {
    const query = `
    query {
      Page(page: ${page}, perPage: 20) {
        media(type: ANIME, sort: START_DATE_DESC, status_not: NOT_YET_RELEASED, isAdult: false, popularity_greater: 10000 ) {
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
      throw new Error(`Error al obtener lista de animes: ${error.message}`);
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
          coverImage {
            large
          }
          startDate {
            year
            month
            day
          }
          status
          episodes
          genres
          description
          recommendations {
            nodes {
                mediaRecommendation {
                  id
                  title{
                    romaji
                  }
                  coverImage {
                    extraLarge
                    large
                  }
                }
        
              }
            }
          }
          }
    `;

    try {
      const response = await axios.post(this.aniListApiUrl, { query });
      const animeDetails = response.data.data.Media;
      return animeDetails;
    } catch (error) {
      throw new Error(`Error al obtener datos del anime: ${error.message}`);
    }
  }

  async searchAnime(search: string) {
    const query = `
                query {
                    Page {
                        media(search: "${search}", type: ANIME) {
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
      return response.data.data.Page.media;
    } catch (error) {
      throw new Error(`Error al buscar anime: ${error.message}`);
    }
  }
}
