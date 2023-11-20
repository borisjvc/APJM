import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Image } from 'semantic-ui-react';
import PlaceholderCard from "../componentes/CardPlaceholder";
import { useParams } from 'react-router-dom';
import Navbar from '../componentes/navbar';
import { useNavigate } from 'react-router-dom';

export default function Resultados() {
    const searchQuery = useParams();
    const navigate = useNavigate();
    const [animeResults, setAnimeResults] = useState([]);
    const [gameResults, setGameResults] = useState([]);
    const [movieResults, setMovieResults] = useState([]);
    const [mangaResults, setMangaResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const animeResponse = await axios.get(`http://localhost:3001/anime/search?search=${searchQuery.search}`);
                setAnimeResults(animeResponse.data);

                const gameResponse = await axios.get(`http://localhost:3001/games/search?search=${searchQuery.search}`);
                setGameResults(gameResponse.data.results);

                const movieResponse = await axios.get(`http://localhost:3001/movies/search?search=${searchQuery.search}`);
                setMovieResults(movieResponse.data);

                const mangaResponse = await axios.get(`http://localhost:3001/manga/search?search=${searchQuery.search}`);
                setMangaResults(mangaResponse.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleCardClick = (Id, tipo) => {
        navigate(`/descripcion/${tipo}/${Id}`);
    };

    return (
        <>
            <Navbar />
            <h1>Animes</h1>
            <Card.Group itemsPerRow={10}>
                {animeResults.length > 0
                    ? animeResults.map((anime) => (
                        <Card
                            key={anime.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(anime.id, 'anime')}
                        >
                            <Image src={anime.coverImage.large || 'https://via.placeholder.com/300x200'} className="card-image" />
                            <div className="card-title">{anime.title.romaji}</div>
                        </Card>
                    ))
                    : Array.from({ length: 20 }, (_, index) => (
                        <PlaceholderCard key={`placeholder-${index}`} />
                    ))}
            </Card.Group>
            <h1>Mangas</h1>
            <Card.Group itemsPerRow={10}>
                {mangaResults.length > 0
                    ? mangaResults.map((manga) => (
                        <Card
                            key={manga.node.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(manga.node.id, "manga")}
                        >
                            <Image src={manga.node.main_picture.large || "https://via.placeholder.com/300x200"} className="card-image" />
                            <div className="card-title">{manga.node.title}</div>
                        </Card>
                    )) : Array.from({ length: 20 }, (_, index) => (
                        <PlaceholderCard key={`placeholder-${index}`} />
                    ))}
            </Card.Group>
            <br />

            <h1>Peliculas</h1>
            <Card.Group itemsPerRow={10}>
                {movieResults.length > 0
                    ? movieResults.map((pelicula) => (
                        <Card
                            key={pelicula.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(pelicula.id, "peliculas")}
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
            <h1>Juegos</h1>
            <Card.Group itemsPerRow={10}>
                {gameResults.length > 0
                    ? gameResults.map((juego) => (
                        <Card
                            key={juego.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(juego.id, "juegos")}
                        >
                            <Image src={juego.background_image || "https://via.placeholder.com/300x200"} className="card-image" />
                            <div className="card-title">{juego.name}</div>
                        </Card>
                    )) : Array.from({ length: 20 }, (_, index) => (
                        <PlaceholderCard key={`placeholder-${index}`} />
                    ))}
            </Card.Group>
        </>
    );
}
