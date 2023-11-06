import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuegosController } from './juegos/juegos.controller';
import { HttpModule } from '@nestjs/axios';
import { AnimeController } from './anime/aniList.controller';
import { AnimeService } from './anime/aniList.service';
import { MangaController } from './manga/manga.controller';
import { MangaService } from './manga/manga.service';
import { PeliculasController } from './peliculas/peliculas.controller';
import { PeliculasService } from './peliculas/peliculas.service';
import { JuegosService } from './juegos/juegos.service';
import { TriviaController } from './trivia/trivia.controller';
import { TriviaService } from './trivia/trivia.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestjsdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
    }),
  UsersModule, HttpModule],
  controllers: [JuegosController, AnimeController, MangaController, PeliculasController, TriviaController],
  providers: [AnimeService, MangaService, PeliculasService, JuegosService, TriviaService],
})
export class AppModule {}
