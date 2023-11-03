import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader, Image } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Juegos() {
    const [juegos, setJuegos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchJuegos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/games/list?page=${currentPage}`);
            setJuegos(response.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchJuegos();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCardClick = (juegoId) => {
        navigate(`/descripcion/juegos/${juegoId}`);
    };


    return (
        <div>
            <div>
                <Button content='Anterior' color='yellow' onClick={handlePrevPage} disabled={currentPage === 1} icon='left chevron' labelPosition='left' />
                <Button content='Siguiente' color='yellow' onClick={handleNextPage} icon='right chevron' labelPosition='right' />
            </div>
            <Dimmer active={isLoading} page>
                <Loader content="Cargando, por favor espere..." />
            </Dimmer>
            <br></br>

            <Card.Group itemsPerRow={5}>
                {juegos.map((juego) => (
                    <Card
                        key={juego.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                        onClick={() => handleCardClick(juego.id)}
                    >
                        <Image src={juego.background_image ? juego.background_image : "URL_Predeterminada"} className="card-image" />
                        <div className="card-title">{juego.name}</div>
                    </Card>

                ))}
            </Card.Group>
            <br></br>
            <div>
                <Button content='Anterior' color='yellow' onClick={handlePrevPage} disabled={currentPage === 1} icon='left chevron' labelPosition='left' />
                <Button content='Siguiente' color='yellow' onClick={handleNextPage} icon='right chevron' labelPosition='right' />
            </div>
        </div>
    );
}
