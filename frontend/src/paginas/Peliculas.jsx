import React, { useState, useEffect } from "react";
import { Button, Card, Image, Pagination } from "semantic-ui-react";
import axios from "axios";
import Footer from "../componentes/Footer";
import { useNavigate } from "react-router-dom";
import PlaceholderCard from "../componentes/CardPlaceholder";
import Navbar from "../componentes/navbar";

export default function Peliculas() {
    const [totalPages, setTotalPages] = useState(10);
    const [peliculas, setPeliculas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/movies/list?page=${currentPage}`);
            const newMovies = response.data;
            setPeliculas(newMovies);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMovies();
        if (currentPage >= totalPages) {
            setTotalPages(currentPage + 10);
        }
    }, [currentPage, totalPages]);

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage);
    };

    const handleCardClick = (peliculaId) => {
        navigate(`/descripcion/peliculas/${peliculaId}`);
    };


    return (
        <>
            <Navbar />
            <div>
                <div>
                    <Pagination
                        activePage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePaginationChange}
                        ellipsisItem={{ content: "..." }}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                    />
                </div>
                <br />

                <Card.Group itemsPerRow={5}>
                    {peliculas.length > 0
                        ? peliculas.map((pelicula) => (
                            <Card
                                key={pelicula.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(pelicula.id)}
                            >
                                <Image src={pelicula.primaryImage ? pelicula.primaryImage.url : "https://via.placeholder.com/300x500"} className="card-image" />
                                <div className="card-title">{pelicula.titleText.text}</div>
                            </Card>
                        ))
                        : Array.from({ length: 10 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
                </Card.Group>
                <br />
                <div>
                    <Pagination
                        activePage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePaginationChange}
                        ellipsisItem={{ content: "..." }}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                    />
                </div>

            </div>
            <Footer />
        </>
    );
}
