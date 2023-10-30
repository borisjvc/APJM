import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";

export default function Anime() {
    const [Animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAnimes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/anime/list?page=${currentPage}`);
            setAnimes(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAnimes();
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


            <div>
                <Button content='Anterior' color='yellow' onClick={handlePrevPage} disabled={currentPage === 1} icon='left chevron' labelPosition='left' />
                <Button content='Siguiente' color='yellow' onClick={handleNextPage} icon='right chevron' labelPosition='right' />
            </div>
            <Dimmer active={isLoading} style={{ height: "180vh" }}>
                <Loader>Cargando</Loader>
            </Dimmer>
            <br></br>
            <Card.Group itemsPerRow={5}>
                {Animes.map((anime) => (
                    <Card
                        key={anime.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                    >
                        <Card.Header>{anime.title.romaji}</Card.Header>
                        <img
                            src={anime.coverImage.large || "URL_Predeterminada"}
                            alt={anime.title.romaji}
                            className="card-image"
                        />
                    </Card>
                ))}
            </Card.Group>

        </div>
    );
}
