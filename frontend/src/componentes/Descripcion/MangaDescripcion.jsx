import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function MangaDescripcion({ manga }) {
    const navigate = useNavigate();

    const handleCardClick = (Id) => {
        navigate(`/descripcion/manga/${Id}`);
    };

    return (
        <>
            <aside className="left-aside">
                <img src={manga.main_picture.large} alt={manga.title} className="manga-image"/>
                <br></br>
                <br></br>
                <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" />

                <br></br>
                <br></br>
                <p>Fecha de inicio: {manga.start_date}</p>
                <p>Estatus: {manga.status}</p>
                <p>Episodios: {manga.num_chapters}</p>
                <p>Géneros: {manga.genres.map((genre) => genre.name).join(", ")}</p>
            </aside>

            <div className="vertical-line"></div>

            <article className="middle-article">
                <h1 className="description-title">{manga.title}</h1>
                <h2>Sinopsis: </h2>
                <p>{manga.synopsis}</p>
                <br />
                <br />

                <h2>Mangas relacionados:</h2>
                <Card.Group itemsPerRow={5}>
                    {manga.related_manga.map((relatedManga) => (
                        <Card
                            key={relatedManga.node.id}
                            color="yellow"
                            raised
                            link
                            fluid='false'
                            className="card-container"
                            onClick={() => handleCardClick(relatedManga.node.id)}
                        >
                            <Image src={relatedManga.node.main_picture.large || "https://via.placeholder.com/300x200"} alt={relatedManga.node.title || "no_title"} className="card-image" />
                            <div className="card-title">{relatedManga.node.title}</div>
                        </Card>
                    ))}
                </Card.Group>

                <h2>Recomendaciones:</h2>
                <Card.Group itemsPerRow={5}>
                    {manga.recommendations.map((recommendation) => (
                        <Card
                            key={recommendation.node.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(recommendation.node.id)}
                        >
                            <Image src={recommendation.node.main_picture.large || "https://via.placeholder.com/300x200"} className="card-image" />
                            <div className="card-title">{recommendation.node.title}</div>
                        </Card>
                    ))}
                </Card.Group>
            </article>
        </>
    );
}
