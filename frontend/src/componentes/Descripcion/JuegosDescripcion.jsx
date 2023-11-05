import { Button, Card, Image } from "semantic-ui-react"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlaceholderCard from "../CardPlaceholder";
import axios from "axios";

export default function JuegosDescripcion({ juego }) {
    const platformNames = juego.parent_platforms.map((platform) => platform.platform.name).join(", ");
    const [juegos, setJuegos] = useState([]);
    const navigate = useNavigate();
    let randomPage = Math.floor(Math.random() * 30) + 1;

    const fetchJuegos = async () => {
        try {
            
            const response = await axios.get(`http://localhost:3001/games/list?page=${randomPage}`);
            setJuegos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchJuegos();
    }, []);

    const handleCardClick = (Id) => { 
        fetchJuegos();
        setJuegos([]);
        navigate(`/descripcion/juegos/${Id}`);
    };

    return (
        <>
            <aside className="left-aside">
                <img src={juego.background_image} alt={juego.name} className="game-image" />
                <br></br>
                <br></br>
                <Button content="Jugar más tarde" icon='bookmark' labelPosition='left' compact color="blue" />{/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}

                <br></br>
                <br></br>
                <p>Fecha de lanzamiento: {juego.released}</p>
                <p>Plataformas: {platformNames}</p>
                <p>Desarrollador: {juego.developers[0].name}</p>

            </aside>

            <div className="vertical-line"></div>

            <article className="middle-article">
                <h1 className="description-title">{juego.name}</h1>
                <h2>Descripción</h2>
                {juego.description_raw}

                <h2>Más juegos</h2>
                <Card.Group itemsPerRow={5}>
                    {juegos.length > 0
                        ? juegos.map((juegoC) => (
                            <Card
                                key={juegoC.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(juegoC.id)}
                            >
                                <Image src={juegoC.background_image || "https://via.placeholder.com/300x200"} className="card-image" />
                                <div className="card-title">{juegoC.name}</div>
                            </Card>
                        )) : Array.from({ length: 20 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
                </Card.Group>
            </article>
        </>
    )

}