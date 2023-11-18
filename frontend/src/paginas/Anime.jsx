import React, { useState, useEffect } from "react";
import { Card, Image, Pagination } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../componentes/Footer";
import PlaceholderCard from "../componentes/CardPlaceholder";
import Navbar from "../componentes/navbar";

export default function Anime() {
    const [Animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const navigate = useNavigate();

    const fetchAnimes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/anime/list?page=${currentPage}`);
            setAnimes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAnimes();
        if (currentPage >= totalPages) {
            setTotalPages(currentPage + 10);
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
                    {Animes.length > 0
                        ? Animes.map((anime) => (
                            <Card
                                key={anime.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(anime.id)}
                            >
                                <Image src={anime.coverImage.large || 'https://via.placeholder.com/300x200'} className="card-image" />
                                <div className="card-title">{anime.title.romaji}</div>
                            </Card>
                        ))
                        : Array.from({ length: 20 }, (_, index) => (
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
