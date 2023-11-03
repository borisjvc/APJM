import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeDescripcion from "../componentes/AnimeDescripcion";
import JuegosDescripcion from "../componentes/JuegosDescripcion";
import MangaDescripcion from "../componentes/MangaDescripcion";

export default function Descripcion() {
    const { Categoria, Id } = useParams();
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        // Dependiendo de qué se haya elegido se hace una solicitud a su respectiva API
        const fetchData = async () => {
            try {
                let response;
                if (Categoria === "anime") {
                    response = await axios.get(`http://localhost:3001/anime/getById?id=${Id}`);
                } else if (Categoria === "manga") {
                    response = await axios.get(`http://localhost:3001/manga/getById?id=${Id}`);
                } else if (Categoria === "peliculas") {
                    response = await axios.get(`http://your-movies-api-url/${Id}`);
                } else if (Categoria === "juegos") {
                    response = await axios.get(`http://localhost:3001/games/getById?id=${Id}`);
                }
                setItemData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [Categoria, Id]);

    if (!itemData) {
        return <div>Loading...</div>;
    }

    //poner más informacion, animes recomendados abajo o animes random, agregar trivia 
    return (
        <div className="descripcion-container">
            {Categoria === "anime" && (
                <AnimeDescripcion anime={itemData} />
            )}

            {Categoria === "juegos" && (
                <JuegosDescripcion juego={itemData} />
            )}
            {Categoria === "manga" && (
                <MangaDescripcion manga={itemData} />
            )}
        </div>
    );
}
