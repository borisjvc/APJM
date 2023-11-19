import React, { useState, useEffect } from "react";
import { Pagination, Card, Image } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlaceholderCard from "../componentes/CardPlaceholder";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/navbar";

export default function Juegos() {
    const [juegos, setJuegos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const navigate = useNavigate();

    const fetchJuegos = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/games/list?page=${currentPage}`);
            setJuegos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchJuegos();
        if (currentPage >= totalPages) {
            setTotalPages(currentPage + 10);
        }
    }, [currentPage, totalPages]);

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage);
    };

    const handleCardClick = (juegoId) => {
        navigate(`/descripcion/juegos/${juegoId}`);
    };


    return (
        <>
            <Navbar/>
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
                <Card.Group itemsPerRow={5}>
                    {juegos.length > 0
                        ? juegos.map((juego) => (
                            <Card
                                key={juego.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(juego.id)}
                            >
                                <Image src={juego.background_image || "https://via.placeholder.com/300x200"} className="card-image" />
                                <div className="card-title">{juego.name}</div>
                            </Card>
                        )) : Array.from({ length: 20 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
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
            <Footer/>
        </>
    );
}
