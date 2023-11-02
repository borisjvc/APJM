import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader, Image } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Manga() {
    const [Mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const fetchMangas = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/manga/list?page=${currentPage}`);
            setMangas(response.data.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMangas();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCardClick = (mangaId) => {
        navigate(`/descripcion/manga/${mangaId}`);
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
                {Mangas.map((manga) => (
                    <Card
                        key={manga.node.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                        onClick={() => handleCardClick(manga.node.id)}
                    >
                        <Image src={manga.node.main_picture.large || "URL_Predeterminada"} className="card-image" />
                        <div className="card-title">{manga.node.title}</div>
                    </Card>
                ))}
            </Card.Group>
            <br></br>
            <div>
                <Button content='Anterior' color='yellow' onClick={handlePrevPage} disabled={currentPage === 1} icon='left chevron' labelPosition='left' />
                <Button content='Siguiente' color='yellow' onClick={handleNextPage} icon='right chevron' labelPosition='right' />
            </div>
        </div >
    );
}
