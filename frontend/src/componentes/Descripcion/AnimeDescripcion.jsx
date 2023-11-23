import { Button, Card, Image, ButtonGroup, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AnimeDescripcion({ anime }) {
    const [message, setMessage] = useState(false);
    const [messageOk, setMessageOK] = useState(false);
    const [isAddedToList, setIsAddedToList] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        getStatus();
    }, [anime]);

    const handleCardClick = (Id) => {
        navigate(`/descripcion/anime/${Id}`);
    };

    const getStatus = async () => {
        if (!token) {
            return
        }

        const decodedToken = jwtDecode(token);
        const user = decodedToken.id;

        const Info = { user: user, elemento: anime.id, tipo: "Anime" };

        axios.post("http://localhost:3001/listas/added", Info)
            .then(response => {
                const resultado = response.data.Resultado;  // 'EXISTE' o 'NO_EXISTE'
                setIsAddedToList(resultado == 'EXISTE');
            })
    }

    const addLater = (id) => {
        if (!token)
            navigate("/login");
        else {
            const decodedToken = jwtDecode(token);
            const user = decodedToken.id;

            const datos = { user: user, elemento: id, status: "Ver más tarde", tipo: "Anime", titulo: anime.title.romaji, img: anime.coverImage.large }
            axios.post(`http://localhost:3001/listas/agregar`, datos)
                .then(response => {
                    if (response.data.affectedRows === 0) {
                        setMessage(true);
                        setTimeout(() => {
                            setMessage(false);
                        }, 2000);
                    } else {
                        setIsAddedToList(true);
                        setMessageOK(true)
                        setTimeout(() => {
                            setMessageOK(false);
                        }, 1000);
                    }
                })
                .catch(error => {
                    console.error("Error al agregar a la lista: ", error);
                });
        }
    };

    const removeLater = (id) => {
        const decodedToken = jwtDecode(token);
        const user = decodedToken.id;
        axios.delete(`http://localhost:3001/listas/eliminar/${user}/${id}/Anime`)
            .then(response => {
                if (response.data.affectedRows > 0) {
                    setMessageOK(true);
                    setTimeout(() => {
                        setMessageOK(false);
                    }, 1000);
                } else {
                    setMessage(true);
                    setTimeout(() => {
                        setMessage(false);
                    }, 2000);
                }
            })
        setIsAddedToList(false);
    };

    const markAsCompleted = (id) => {
        const decodedToken = jwtDecode(token);
        const user = decodedToken.id;
        const newStatus = { user: user, elemento: id, status: "Completado", tipo: "Anime" }
        axios.put(`http://localhost:3001/listas/status`, newStatus)
            .then(response => {
                if (response.data.affectedRows > 0) {
                    setMessageOK(true);
                    setTimeout(() => {
                        setMessageOK(false);
                    }, 1000);
                } else {
                    setMessage(true);
                    setTimeout(() => {
                        setMessage(false);
                    }, 2000);
                }
            })
    };

    return (
        <>
            <aside className="left-aside">
                <img src={anime.coverImage.large} alt={anime.title.romaji} />
                <br></br>
                <br></br>

                {!isAddedToList ? (
                    <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" onClick={() => addLater(anime.id)} />
                ) : (
                    <ButtonGroup>
                        <Button content="Completado" icon='check circle' labelPosition='left' compact color="blue" onClick={() => markAsCompleted(anime.id)} />
                        <Button content="Eliminar" icon='remove circle' labelPosition='left' compact color="red" onClick={() => removeLater(anime.id)} />
                    </ButtonGroup>
                )}

                {message && (
                    <Message content="Ha ocurrido un error" color="red"></Message>
                )}
                {messageOk && (
                    <Message content="Listo" color="teal" icon="check"></Message>
                )}

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
                <p style={{ textAlign: "justify" }}>
                    <p>{anime.description}</p>
                </p>

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