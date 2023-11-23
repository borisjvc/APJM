import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, Card, Image, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function MangaDescripcion({ manga }) {
    const [message, setMessage] = useState(false);
    const [messageOk, setMessageOK] = useState(false);
    const [isAddedToList, setIsAddedToList] = useState(false);
    const token = localStorage.getItem('token');


    const navigate = useNavigate();

    useEffect(() => {
        getStatus();
        setMessage(false);
    }, [manga]);

    const getStatus = async () => {
        if (!token) {
            return
        }

        const decodedToken = jwtDecode(token);
        const user = decodedToken.id;

        const mangaInfo = { user: user, elemento: manga.id, tipo: "Manga" };

        axios.post("http://localhost:3001/listas/added", mangaInfo)
            .then(response => {
                const resultado = response.data.Resultado;  // 'EXISTE' o 'NO_EXISTE'
                setIsAddedToList(resultado == 'EXISTE');
            })
    }

    const handleCardClick = (id) => {
        navigate(`/descripcion/manga/${id}`);
    };

    const addLater = (id) => {
        if (!token)
            navigate("/login");
        else {
            const decodedToken = jwtDecode(token);
            const user = decodedToken.id;

            const datos = { user: user, elemento: id, status: "Ver más tarde", tipo: "Manga", titulo: manga.title, img: manga.main_picture.large }
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
        axios.delete(`http://localhost:3001/listas/eliminar/${user}/${id}/Manga`)
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
        const newStatus = { user: user, elemento: id, status: "Completado", tipo: "Manga" }
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
                <img src={manga.main_picture.large} alt={manga.title} className="manga-image" />
                <br></br>
                <br></br>

                {!isAddedToList ? (
                    <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" onClick={() => addLater(manga.id)} />
                ) : (
                    <ButtonGroup>
                        <Button content="Completado" icon='check circle' labelPosition='left' compact color="blue" onClick={() => markAsCompleted(manga.id)} />
                        <Button content="Eliminar" icon='remove circle' labelPosition='left' compact color="red" onClick={() => removeLater(manga.id)} />
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
                <p>Fecha de inicio: {manga.start_date}</p>
                <p>Estatus: {manga.status}</p>
                <p>Episodios: {manga.num_chapters}</p>
                <p>Géneros: {manga.genres.map((genre) => genre.name).join(", ")}</p>
            </aside>

            <div className="vertical-line"></div>

            <article className="middle-article">
                <h1 className="description-title">{manga.title}</h1>
                <h2>Sinopsis: </h2>
                <p style={{ textAlign: "justify" }}>
                    <p>{manga.synopsis}</p>
                </p>
                <br />
                <br />

                <h2>Mangas relacionados:</h2>
                <Card.Group itemsPerRow={8}>
                    {manga.related_manga.map((relatedManga) => (
                        <Card
                            key={relatedManga.node.id}
                            color="yellow"
                            raised
                            link
                            className="card-container"
                            onClick={() => handleCardClick(relatedManga.node.id)}
                        >
                            <Image src={relatedManga.node.main_picture.large || "https://via.placeholder.com/300x200"} alt={relatedManga.node.title || "no_title"} className="card-image" />
                            <div className="card-title">{relatedManga.node.title}</div>
                        </Card>
                    ))}
                </Card.Group>

                <h2>Recomendaciones:</h2>
                <Card.Group itemsPerRow={8}>
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
