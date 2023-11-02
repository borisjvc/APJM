import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamController } from './juegos/steam.controller';
import { HttpModule } from '@nestjs/axios';
import { AnimeController } from './anime/aniList.controller';
import { AnimeService } from './anime/aniList.service';
import { MangaController } from './manga/manga.controller';
import { MangaService } from './manga/manga.service';
import { PeliculasController } from './peliculas/peliculas.controller';
import { PeliculasService } from './peliculas/peliculas.service';

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
  controllers: [AppController, SteamController, AnimeController, MangaController, PeliculasController],
  providers: [AppService, AnimeService, MangaService, PeliculasService],
})
export class AppModule {}
