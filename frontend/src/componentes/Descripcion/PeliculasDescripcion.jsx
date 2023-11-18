import { useEffect, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react"
import PlaceholderCard from "../CardPlaceholder";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PeliculasDescripcion({ pelicula }) {
    const [random, setPeliculas] = useState([]);
    const navigate = useNavigate();

    const genresList = pelicula.genres.genres.map(genre => genre.text).join(', ');

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3001/movies/random`);
        setPeliculas(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleCardClick = (Id) => {
        fetchData();
        setPeliculas([]);
        navigate(`/descripcion/peliculas/${Id}`);

    };

    return (
        <>
            <aside className="left-aside">
                <img src={pelicula.primaryImage.url} alt={pelicula.titleText.text} className="movie-image" />
                <br></br>
                <br></br>
                <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" />{/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}

                <br></br>
                <br></br>
                <p>Fecha de lanzamiento: {pelicula.releaseYear.year}</p>
                <p>Género: {genresList}</p>

            </aside>

            <div className="vertical-line"></div>

            <article className="middle-article">
                <h1 className="description-title">{pelicula.titleText.text}</h1>
                <h2>Descripción: </h2>
                {pelicula.plot.plotText.plainText}

                <h2>Más peliculas</h2>
                <Card.Group itemsPerRow={5}>
                    {random.length > 0
                        ? random.map((peli) => (
                            <Card
                                key={peli.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(peli.id)}
                            >
                                <Image src={peli.primaryImage ? peli.primaryImage.url : "https://via.placeholder.com/300x500"} className="card-image" />
                                <div className="card-title">{peli.titleText.text}</div>
                            </Card>
                        ))
                        : Array.from({ length: 10 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
                </Card.Group>
            </article>
        </>
    )

}