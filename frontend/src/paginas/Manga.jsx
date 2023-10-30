import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";

export default function Manga() {
    const [Mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMangas = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/manga/list?page=${currentPage}`);
            setMangas(response.data.data);
            console.log(response.data.data);
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
                {Mangas.map((manga) => (
                    <Card
                        key={manga.node.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                    >
                        <Card.Header>{manga.node.title}</Card.Header>
                        <img
                            src={manga.node.main_picture.large || "URL_Predeterminada"}
                            alt={manga.node.title}
                            className="card-image"
                        />
                    </Card>
                ))}
            </Card.Group>

        </div>
    );
}
