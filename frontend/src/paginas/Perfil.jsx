import React, { useState, useEffect } from 'react';
import { Container, Grid, Image, Tab, Form, Button, Card, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function Perfil() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [User, setUser] = useState('');
    const [Listas, setListas] = useState([]);
    const [Anime, setAnime] = useState([]);
    const [Peliculas, setPeliculas] = useState([]);
    const [Juegos, setJuegos] = useState([]);
    const [Manga, setManga] = useState([]);

    const fetchData = async () => {
        if (!token) {
            navigate("/login");
        } else {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);

                const response = await axios.get(`http://localhost:3001/listas/${decodedToken.id}`);
                setListas(response.data);
            } catch (error) {
                console.error("Error al obtener listas: ", error);
            }
        }
    };

    const fetchImg = async () => {
        try {
            //TODO: Conseguir la informacion de cada anime,pelicula, etc para mostrar una card que tenga su imagen y nombre
            const response = await axios.get(`http://localhost:3001/anime/`);
            setAnime(response)
        } catch (error) {
            console.error("Error al obtener imagenes: ", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchImg();
    }, []);

    const handleEdit = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSaveChanges = () => {
        // Implementa la lógica para guardar los cambios en la base de datos
        // Puedes hacer una solicitud PUT a la API para actualizar los datos del usuario
        setIsEditMode(false);
    };

    const userLists = {
        animes: ['Attack on Titan', 'My Hero Academia', 'Death Note'],
        mangas: ['One Piece', 'Naruto', 'Demon Slayer'],
        movies: ['Inception', 'The Shawshank Redemption', 'The Dark Knight'],
        videoGames: ['The Legend of Zelda', 'Super Mario Odyssey', 'Final Fantasy VII'],
    };

    const panes = [
        { menuItem: 'Animes', render: () => <Tab.Pane>{renderList(userLists.animes)}</Tab.Pane> },
        { menuItem: 'Mangas', render: () => <Tab.Pane>{renderList(userLists.mangas)}</Tab.Pane> },
        { menuItem: 'Peliculas', render: () => <Tab.Pane>{renderList(userLists.movies)}</Tab.Pane> },
        { menuItem: 'Videojuegos', render: () => <Tab.Pane>{renderList(userLists.videoGames)}</Tab.Pane> },
    ];

    //AQUI DEBERIA MOSTRAR SU IMAGEN Y TITULO Y AL DARLE CLICK TE DEBERIA MANDAR A SU PAGINA DE INFORMACION,
    //IGUAL SE DEBERIA PODER ELIMINAR DE LA LISTA (O MARCARLO COMO COMPLETADO)??
    const renderList = (list) => (
        <Card.Group>
            {Listas.map((item) => (
                <Card key={item.ElementoID}>
                    <Card.Content>
                        <Card.Header>{item.Estatus}: {item.ElementoID}</Card.Header>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );

    return (
        <Container className="emp-profile">
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <div className="profile-img">
                                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className="profile-head">
                                <h2>{User.username} </h2>
                                <h4>Email: {User.email}</h4>
                            </div>
                            <Button primary icon labelPosition="left" onClick={handleEdit}>
                                <Icon name="edit outline" />
                                Editar Datos
                            </Button>
                            {isEditMode && (
                                <>
                                    <Button color="green" icon labelPosition="left" onClick={handleSaveChanges}>
                                        <Icon name="save outline" />
                                        Guardar Cambios
                                    </Button>
                                    <Button color="red" icon labelPosition="left" onClick={handleEdit}> <Icon name="window close" />Cancelar</Button>
                                </>
                            )}
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={16}>
                            <h2>Ver más tarde</h2>
                            <Tab panes={panes} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </Container>
    );
};
