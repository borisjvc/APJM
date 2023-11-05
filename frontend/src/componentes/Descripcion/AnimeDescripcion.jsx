import { Button, Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function AnimeDescripcion({ anime }) {
    const navigate = useNavigate();

    const handleCardClick = (Id) => {
        navigate(`/descripcion/anime/${Id}`);
    };

    return (
        <>
            <aside className="left-aside">
                <img src={anime.coverImage.large} alt={anime.title.romaji} />
                <br></br>
                <br></br>
                <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" />{/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}

                <br></br>
                <br></br>
                <p>Fecha de inicio: {anime.startDate.year}</p>
                <p>Estatus: {anime.status}</p>
                <p>Episodios: {anime.episodes}</p>
                <p>Genero: {anime.genres.join(", ")}</p>

            </aside>

            <div className="vertical-line"></div>

            <article className="middle-article">
                <h1 className="description-title">{anime.title.romaji}</h1>
                <h2>Sinopsis: </h2>
                <p>{anime.description}</p>

                <h2>Recomendaciones:</h2>
                <Card.Group itemsPerRow={5}>
                    {anime.recommendations.nodes.map((recommendation) => (
                        <Card
                            key={recommendation.mediaRecommendation.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(recommendation.mediaRecommendation.id)}
                        >
                            <Image src={recommendation.mediaRecommendation.coverImage.large || "https://via.placeholder.com/300x200"} className="card-image" />
                            <div className="card-title">{recommendation.mediaRecommendation.title.romaji}</div>
                        </Card>
                    ))}
                </Card.Group>
            </article>
        </>
    )

}