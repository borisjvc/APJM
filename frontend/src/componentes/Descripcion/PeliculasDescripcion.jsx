import { useEffect, useState } from "react";
import { Button, Card, Image, Message, ButtonGroup } from "semantic-ui-react"
import PlaceholderCard from "../CardPlaceholder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PeliculasDescripcion({ pelicula }) {
    const [random, setPeliculas] = useState([]);
    const [message, setMessage] = useState(false);
    const [messageOk, setMessageOK] = useState(false);
    const [isAddedToList, setIsAddedToList] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const genresList = pelicula.genres.genres.map(genre => genre.text).join(', ');

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3001/movies/random`);
        setPeliculas(response.data);
    };

    useEffect(() => {
        fetchData();
        getStatus();
    }, [pelicula])

    const handleCardClick = (Id) => {
        fetchData();
        setPeliculas([]);
        navigate(`/descripcion/peliculas/${Id}`);

    };

    const getStatus = async () => {
        if (!token) {
            return
        }

        const decodedToken = jwtDecode(token);
        const user = decodedToken.id;

        const Info = { user: user, elemento: pelicula.id, tipo: "Peliculas" };

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

            const datos = { user: user, elemento: id, status: "Ver más tarde", tipo: "Peliculas", titulo: pelicula.titleText.text, img: pelicula.primaryImage.url }
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
        axios.delete(`http://localhost:3001/listas/eliminar/${user}/${id}/Peliculas`)
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
        const newStatus = { user: user, elemento: id, status: "Completado", tipo: "Peliculas" }
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
                <img src={pelicula.primaryImage.url} alt={pelicula.titleText.text} className="movie-image" />
                <br></br>
                <br></br>

                {!isAddedToList ? (
                    <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" onClick={() => addLater(pelicula.id)} />
                ) : (
                    <ButtonGroup>
                        <Button content="Completado" icon='check circle' labelPosition='left' compact color="blue" onClick={() => markAsCompleted(pelicula.id)} />
                        <Button content="Eliminar" icon='remove circle' labelPosition='left' compact color="red" onClick={() => removeLater(pelicula.id)} />
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
                <p>Fecha de lanzamiento: {pelicula.releaseYear.year}</p>
                <p>Género: {genresList}</p>

            </aside>

            <div className="vertical-line"></div>

            <article className="middle-article">
                <h1 className="description-title">{pelicula.titleText.text}</h1>
                <h2>Descripción: </h2>
                <p style={{ textAlign: "justify" }}>
                    {pelicula.plot.plotText.plainText}
                </p>

                <h2>Más peliculas</h2>
                <Card.Group itemsPerRow={5}>
                    {random.length > 0
                        ? random.map((peli) => (
                            <Card
                                key={peli.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(peli.id)}
                            >
                                <Image src={peli.primaryImage ? peli.primaryImage.url : "https://via.placeholder.com/300x500"} className="card-image" />
                                <div className="card-title">{peli.titleText.text}</div>
                            </Card>
                        ))
                        : Array.from({ length: 10 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
                </Card.Group>
            </article>
        </>
    )

}