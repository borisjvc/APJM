import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader, Image } from "semantic-ui-react";
import axios from "axios";

export default function Inicio() {
    const [peliculas, setPeliculas] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const fetchMovies = async () => {
        try {
            const response = await axios.get("http://localhost:3001/movies/1");
            const newMovies = response.data;
            setPeliculas(newMovies);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies();
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
                {peliculas.map((pelicula) => (
                    <Card
                        key={pelicula.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                    >
                        <Image src={pelicula.primaryImage ? pelicula.primaryImage.url : "URL_Predeterminada"} className="card-image" />
                        <div className="card-title">{pelicula.titleText.text}</div>
                    </Card>
                ))}
            </Card.Group>
            <br></br>
            <h1>Animes</h1>
            <Card.Group itemsPerRow={5}>
                {peliculas.map((pelicula) => (
                    <Card
                        key={pelicula.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                    >
                        <Image src={pelicula.primaryImage ? pelicula.primaryImage.url : "URL_Predeterminada"} className="card-image" />
                        <div className="card-title">{pelicula.titleText.text}</div>
                    </Card>
                ))}
            </Card.Group>
            <br></br>
            <h1>Juegos</h1>
            <Card.Group itemsPerRow={5}>
                {peliculas.map((pelicula) => (
                    <Card
                        key={pelicula.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                    >
                        <Image src={pelicula.primaryImage ? pelicula.primaryImage.url : "URL_Predeterminada"} className="card-image" />
                        <div className="card-title">{pelicula.titleText.text}</div>
                    </Card>
                ))}
            </Card.Group>
        </article>
    )
}