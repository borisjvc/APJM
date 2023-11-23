import { Button, Card, Image, ButtonGroup, Message } from "semantic-ui-react"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlaceholderCard from "../CardPlaceholder";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function JuegosDescripcion({ juego }) {
    const [message, setMessage] = useState(false);
    const [messageOk, setMessageOK] = useState(false);
    const [isAddedToList, setIsAddedToList] = useState(false);
    const token = localStorage.getItem('token');
    const [juegos, setJuegos] = useState([]);
    const navigate = useNavigate();
    const platformNames = juego.parent_platforms.map((platform) => platform.platform.name).join(", ");
    let randomPage = Math.floor(Math.random() * 30) + 1;

    const fetchJuegos = async () => {
        try {

            const response = await axios.get(`http://localhost:3001/games/list?page=${randomPage}`);
            setJuegos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchJuegos();
        getStatus();
    }, [juego]);

    const handleCardClick = (Id) => {
        fetchJuegos();
        setJuegos([]);
        navigate(`/descripcion/juegos/${Id}`);
    };

    const getStatus = async () => {
        if (!token) {
            return
        }

        const decodedToken = jwtDecode(token);
        const user = decodedToken.id;

        const Info = { user: user, elemento: juego.id, tipo: "Juegos" };

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

            const datos = { user: user, elemento: id, status: "Ver más tarde", tipo: "Juegos", titulo: juego.name, img: juego.background_image }
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
        axios.delete(`http://localhost:3001/listas/eliminar/${user}/${id}/Juegos`)
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
        const newStatus = { user: user, elemento: id, status: "Completado", tipo: "Juegos" }
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
                <img src={juego.background_image} alt={juego.name} className="game-image" />
                <br></br>
                <br></br>

                {!isAddedToList ? (
                    <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" onClick={() => addLater(juego.id)} />
                ) : (
                    <ButtonGroup>
                        <Button content="Completado" icon='check circle' labelPosition='left' compact color="blue" onClick={() => markAsCompleted(juego.id)} />
                        <Button content="Eliminar" icon='remove circle' labelPosition='left' compact color="red" onClick={() => removeLater(juego.id)} />
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
                <p>Fecha de lanzamiento: {juego.released}</p>
                <p>Plataformas: {platformNames}</p>
                <p>Desarrollador: {juego.developers[0].name}</p>

            </aside>

            <div className="vertical-line"></div>

            <article className="middle-article">
                <h1 className="description-title">{juego.name}</h1>
                <h2>Descripción</h2>
                <p style={{ textAlign: "justify" }}>
                    {juego.description_raw}
                </p>

                <h2>Más juegos</h2>
                <Card.Group itemsPerRow={5}>
                    {juegos.length > 0
                        ? juegos.map((juegoC) => (
                            <Card
                                key={juegoC.id}
                                color="yellow"
                                raised
                                link
                                className="card-container"
                                onClick={() => handleCardClick(juegoC.id)}
                            >
                                <Image src={juegoC.background_image || "https://via.placeholder.com/300x200"} className="card-image" />
                                <div className="card-title">{juegoC.name}</div>
                            </Card>
                        )) : Array.from({ length: 20 }, (_, index) => (
                            <PlaceholderCard key={`placeholder-${index}`} />
                        ))}
                </Card.Group>
            </article>
        </>
    )

}