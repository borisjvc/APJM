import React, { useState, useEffect } from "react";
import { Pagination, Card, Image } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlaceholderCard from "../componentes/CardPlaceholder";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/navbar";

export default function Manga() {
    const [Mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const navigate = useNavigate();


    const fetchMangas = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/manga/list?page=${currentPage}`);
            setMangas(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMangas();
        if (currentPage >= totalPages) {
            setTotalPages(currentPage + 10);
        }
    }, [currentPage, totalPages]);

    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage);
    };

    const handleCardClick = (mangaId) => {
        navigate(`/descripcion/manga/${mangaId}`);
    };

    return (
        <>
            <Navbar />
            <div>
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

                <br></br>
                <Card.Group itemsPerRow={5}>
                    {Mangas.length > 0
                        ? Mangas.map((manga) => (
                            <Card
                                key={manga.node.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(manga.node.id)}
                            >
                                <Image src={manga.node.main_picture.large || "https://via.placeholder.com/300x200"} className="card-image" />
                                <div className="card-title">{manga.node.title}</div>
                            </Card>
                        )) : Array.from({ length: 20 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
                </Card.Group>

                <br></br>
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
            </div >
            <Footer />
        </>
    );
}
