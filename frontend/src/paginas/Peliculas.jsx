import React, { useState, useEffect } from "react";
import { Button, Card, Loader, Image, Dimmer } from "semantic-ui-react";
import axios from "axios";
import Footer from "../componentes/Footer";
import { useNavigate } from "react-router-dom";

export default function Peliculas() {
    const [isLoading, setLoading] = useState(false);
    const [peliculas, setPeliculas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const fetchMovies = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/movies/${currentPage}`);
            const newMovies = response.data;
            setPeliculas(newMovies);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCardClick = (peliculaId) => {
        navigate(`/descripcion/peliculas/${peliculaId}`);
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
                    {peliculas.map((pelicula) => (
                        <Card
                            key={pelicula.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(pelicula.id)}
                        >
                            <Image src={pelicula.primaryImage ? pelicula.primaryImage.url : "URL_Predeterminada"} className="card-image" />
                            <div className="card-title">{pelicula.titleText.text}</div>
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
