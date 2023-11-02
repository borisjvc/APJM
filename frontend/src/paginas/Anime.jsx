import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../componentes/Footer";

export default function Anime() {
    const [Animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const fetchAnimes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/anime/list?page=${currentPage}`);
            setAnimes(response.data);
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

    const handleCardClick = (animeId) => {
        navigate(`/descripcion/anime/${animeId}`);
    };

    return (
        <>
            <div>
                <div>
                    <Button content='Anterior' color='yellow' onClick={handlePrevPage} disabled={currentPage === 1} icon='left chevron' labelPosition='left' />
                    <Button content='Siguiente' color='yellow' onClick={handleNextPage} icon='right chevron' labelPosition='right' />
                </div>
                <br></br>
                <Dimmer active={isLoading} page>
                    <Loader content="Cargando, por favor espere..." />
                </Dimmer>
                <Card.Group itemsPerRow={5}>
                    {Animes.map((anime) => (
                        <Card
                            key={anime.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(anime.id)}
                        >
                            <Image src={anime.coverImage.large || "URL_Predeterminada"} className="card-image" />
                            <div className="card-title">{anime.title.romaji}</div>
                        </Card>
                    ))}

                </Card.Group>

                <br></br>
                <div>
                    <Button content='Anterior' color='yellow' onClick={handlePrevPage} disabled={currentPage === 1} icon='left chevron' labelPosition='left' />
                    <Button content='Siguiente' color='yellow' onClick={handleNextPage} icon='right chevron' labelPosition='right' />
                </div>
            </div>

            <Footer />
        </>
    );
}
