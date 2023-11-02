import React, { useState, useEffect } from "react";
import { Button, Card, Dimmer, Loader, Image, Pagination } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../componentes/Footer";

export default function Anime() {
    const [Animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(10); // Initial total pages
    const navigate = useNavigate();

    const fetchAnimes = async (page) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/anime/list?page=${page}`);
            setAnimes(response.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAnimes(currentPage);
        // Update total pages based on the current page (for dynamic loading)
        if (currentPage >= totalPages) {
            setTotalPages(currentPage + 10); // Add more pages
        }
    }, [currentPage, totalPages]);

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage);
    };

    const handleCardClick = (animeId) => {
        navigate(`/descripcion/anime/${animeId}`);
    };

    return (
        <>
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
