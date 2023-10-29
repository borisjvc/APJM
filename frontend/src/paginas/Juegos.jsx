import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";

export default function Juegos() {
    const [juegos, setJuegos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchJuegos = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/games?page=${currentPage}`);
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

    return (
        <div>
            <Dimmer active={isLoading} style={{ height: "180vh" }}>
                <Loader>Cargando</Loader>
            </Dimmer>

            <Card.Group itemsPerRow={5}>
                {juegos.map((juego) => (
                    <Card
                        key={juego.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                    >
                        <Card.Header>{juego.name}</Card.Header>
                        <img
                            src={juego.background_image ? juego.background_image : "URL_Predeterminada"}
                            alt={juego.name}
                            className="card-image"
                        />
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
