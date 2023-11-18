import React, { useState, useEffect } from "react";
import { Card, Image } from "semantic-ui-react";
import axios from "axios";
import PlaceholderCard from "../componentes/CardPlaceholder";
import { useNavigate } from "react-router-dom";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/navbar";

export default function Inicio() {
    const [peliculas, setPeliculas] = useState([]);
    const [juegos, setJuegos] = useState([]);
    const [Animes, setAnimes] = useState([]);
    const [Mangas, setMangas] = useState([]);
    const navigate = useNavigate();

    const handleCardClick = (Id, tipo) => {
        navigate(`/descripcion/${tipo}/${Id}`);
    };

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
        <>
            <Navbar />
            <article>
                <div className="banner-destacado">
                    <Card.Group itemsPerRow={4}>
                        {peliculas.length > 0 && (
                            <Card
                                key={peliculas[0].id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(peliculas[0].id, "peliculas")}
                            >
                                <Image src={peliculas[0].primaryImage ? peliculas[0].primaryImage.url : "https://via.placeholder.com/300x500"} className="card-image" />
                                <div className="card-title">{peliculas[0].titleText.text}</div>
                            </Card>
                        )}
                        {peliculas.length > 0 && (
                            <Card
                                key={peliculas[1].id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(peliculas[1].id, "peliculas")}
                            >
                                <Image src={peliculas[1].primaryImage ? peliculas[1].primaryImage.url : "https://via.placeholder.com/300x500"} className="card-image" />
                                <div className="card-title">{peliculas[1].titleText.text}</div>
                            </Card>
                        )}
                        {Animes.length > 0 && (
                            <Card
                                key={Animes[0].id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(Animes[0].id, "anime")}
                            >
                                <Image src={Animes[0].coverImage.large || 'https://via.placeholder.com/300x200'} className="card-image" />
                                <div className="card-title">{Animes[0].title.romaji}</div>
                            </Card>
                        )}
                        {Mangas.length > 0 && (
                            <Card
                                key={Mangas[0].node.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(Mangas[0].node.id, "manga")}
                            >
                                <Image src={Mangas[0].node.main_picture.large || "https://via.placeholder.com/300x200"} className="card-image" />
                                <div className="card-title">{Mangas[0].node.title}</div>
                            </Card>
                        )}
                    </Card.Group>
                </div>
                <br></br>
                <h1>Animes</h1>
                <Card.Group itemsPerRow={10}>
                    {Animes.length > 0
                        ? Animes.map((anime) => (
                            <Card
                                key={anime.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(anime.id, "anime")}
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
                <Card.Group itemsPerRow={10}>
                    {Mangas.length > 0
                        ? Mangas.map((manga) => (
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
                    {peliculas.length > 0
                        ? peliculas.map((pelicula) => (
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
                    {juegos.length > 0
                        ? juegos.map((juego) => (
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
            </article>

            <Footer />
        </>
    )
}