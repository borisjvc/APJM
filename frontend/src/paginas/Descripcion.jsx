import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "semantic-ui-react";

export default function Descripcion() {
    const { Categoria, Id } = useParams();
    const [anime, setItemData] = useState(null);

    useEffect(() => {
        // Dependiendo de qué se haya elegido se hace una solicitud a su respectiva API
        const fetchData = async () => {
            try {
                let response;
                if (Categoria === "anime") {
                    response = await axios.get(`http://localhost:3001/anime/getAnimeById?id=${Id}`);
                } else if (Categoria === "manga") {
                    response = await axios.get(`http://your-manga-api-url/${Id}`);
                } else if (Categoria === "peliculas") {
                    response = await axios.get(`http://your-movies-api-url/${Id}`);
                } else if (Categoria === "juegos") {
                    response = await axios.get(`http://your-videogames-api-url/${Id}`);
                }
                setItemData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [Categoria, Id]);

    if (!anime) {
        return <div>Loading...</div>;
    }


    return (
        <div className="descripcion-container">
            <aside className="left-aside">
                <img src={anime.coverImage.large} alt={anime.title.romaji} />
                <br></br>
                <br></br>
                <Button.Group >
                    <Button size='mini' content="Agregar a Ver más tarde" compact/>{/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}
                    <Button content="Eliminar de Ver más tarde" compact/> {/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}
                    <Button content="Marcar como completado" compact/> {/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}
                </Button.Group>

                <br></br>
                <br></br>
                <p>Fecha de inicio: {anime.startDate.year}</p>
                <p>Estatus: {anime.status}</p>
                <p>Episodios: {anime.episodes}</p>
                <p>Genero: {anime.genres.join(", ")}</p>

            </aside>
            <article className="middle-article">
                <h1 className="description-title">{anime.title.romaji}</h1>
                <h2>Sinopsis: </h2>
                {anime.description}
            </article>
            <aside className="right-aside">
                <p>Fecha de inicio: {anime.startDate.year}</p>
                <p>Estatus: {anime.status}</p>
                <p>Episodios: {anime.episodes}</p>
                <p>Genero: {anime.genres.join(", ")}</p>
            </aside>
        </div>
    );
}
