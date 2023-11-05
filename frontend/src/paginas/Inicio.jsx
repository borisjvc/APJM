import React, { useState, useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import axios from "axios";
import PlaceholderCard from "../componentes/CardPlaceholder";

export default function Inicio() {
    const [peliculas, setPeliculas] = useState([]);
    const [juegos, setJuegos] = useState([]);
    const [Animes, setAnimes] = useState([]);
    const [Mangas, setMangas] = useState([]);
    

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/movies/list?page=1`);
            const newMovies = response.data;
            setPeliculas(newMovies);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchJuegos = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/games/list?page=1`);
            setJuegos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMangas = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/manga/list?page=1`);
            setMangas(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAnimes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/anime/list?page=1`);
            setAnimes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchJuegos();
        fetchAnimes();
        fetchMangas();
    }, []);

    return (
        <article>
            <div className="banner-destacado">
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/NNxYkU70HPurnNCSiCjYAmacwm.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/2urdwqEL9FRkGMKAkhfvWTALG00.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/8Im6DknDVxRiGXc5t8rVOJyzuNx.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/voHUmluYmKyleFkTu3lOXQG702u.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
            </div>
            <br></br>
            <h1>Peliculas</h1>
            <Card.Group itemsPerRow={5}>
                    {peliculas.length > 0
                        ? peliculas.map((pelicula) => (
                            <Card
                                key={pelicula.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(pelicula.id)}
                            >
                                <Image src={pelicula.primaryImage ? pelicula.primaryImage.url : "https://via.placeholder.com/300x500"} className="card-image" />
                                <div className="card-title">{pelicula.titleText.text}</div>
                            </Card>
                        ))
                        : Array.from({ length: 10 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
            </Card.Group>
            <br></br>
            <h1>Animes</h1>
            <Card.Group itemsPerRow={5}>
                    {Animes.length > 0
                        ? Animes.map((anime) => (
                            <Card
                                key={anime.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(anime.id)}
                            >
                                <Image src={anime.coverImage.large || 'https://via.placeholder.com/300x200'} className="card-image" />
                                <div className="card-title">{anime.title.romaji}</div>
                            </Card>
                        ))
                        : Array.from({ length: 20 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} /> 
                        ))}
                </Card.Group>
            <br></br>

            <h1>Mangas</h1>
            <Card.Group itemsPerRow={5}>
                {Mangas.length > 0
                    ? Mangas.map((manga) => (
                        <Card
                            key={manga.node.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(manga.node.id)}
                        >
                            <Image src={manga.node.main_picture.large || "https://via.placeholder.com/300x200"} className="card-image" />
                            <div className="card-title">{manga.node.title}</div>
                        </Card>
                    )) : Array.from({ length: 20 }, (_, index) => (
                        <PlaceholderCard key={`placeholder-${index}`} />
                    ))}
            </Card.Group>
            <br/>
            <h1>Juegos</h1>
            <Card.Group itemsPerRow={5}>
                    {juegos.length > 0
                        ? juegos.map((juego) => (
                            <Card
                                key={juego.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(juego.id)}
                            >
                                <Image src={juego.background_image || "https://via.placeholder.com/300x200"} className="card-image" />
                                <div className="card-title">{juego.name}</div>
                            </Card>
                        )) : Array.from({ length: 20 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
                </Card.Group>
        </article>
    )
}