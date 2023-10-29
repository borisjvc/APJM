import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";

export default function Peliculas() {
    const [loading, setLoading] = useState(false);
    const [peliculas, setPeliculas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const apiKey = "174aa06026msh011534ebd880cdfp152733jsnd5a6ad656f65";
    const apiUrl = "https://moviesdatabase.p.rapidapi.com/titles";

    const fetchMovies = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(apiUrl, {
                params: {
                    endYear: "2022",
                    info: 'mini_info',
                    startYear: "1990",
                    page: page,
                },
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                },
            });
            const newMovies = response.data.results;
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

    return (
        <div>
            <Dimmer active={loading}>
                <Loader>Loading</Loader>
            </Dimmer>
            <Card.Group itemsPerRow={5}>
                {peliculas.map((pelicula) => (
                    <Card
                        key={pelicula.id}
                        color="yellow"
                        raised
                        link
                        className="card-container"
                    >
                        <img
                            src={pelicula.primaryImage ? pelicula.primaryImage.url : "URL_Predeterminada"}
                            alt={pelicula.titleText.text}
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
