import React, { useState, useEffect } from 'react';
import { Container, Grid, Image, Tab, Form, Button, Card, Icon, Segment, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Navbar from '../componentes/navbar';

export default function Perfil() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    const [User, setUser] = useState('');
    const [Ubicacion, setUbicacion] = useState(null)
    const [Listas, setListas] = useState([]);
    const [editedUser, setEditedUser] = useState({
        username: '',
        passwrd: '',
    });

    const fetchData = async () => {
        if (!token) {
            navigate("/login");
        } else {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);

                const response = await axios.get(`http://localhost:3001/listas/${decodedToken.id}`);
                setListas(response.data);

                const ubicacion = await axios.get(`http://localhost:3001/geolocation`);
                setUbicacion(ubicacion.data.flag.emoji)
            } catch (error) {
                console.error("Error al obtener listas: ", error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleEdit = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:3001/usuarios/${User.id}`, {
            Username: editedUser.username,
            Passwrd: editedUser.passwrd,
            Email: User.email,
            Rol: "Usuario",
        }).then((response) => {
            navigate("/perfil");
            setIsEditMode(false);
        }).catch((error) => {
            console.error("Error al guardar los cambios: ", error);
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleCardClick = (id, tipo) => {
        navigate(`/descripcion/${tipo.toLowerCase()}/${id}`);
    };

    const panes = [
        { menuItem: 'Animes', render: () => <Tab.Pane>{renderList(Listas, 'Anime')}</Tab.Pane> },
        { menuItem: 'Mangas', render: () => <Tab.Pane>{renderList(Listas, 'Manga')}</Tab.Pane> },
        { menuItem: 'Peliculas', render: () => <Tab.Pane>{renderList(Listas, 'Peliculas')}</Tab.Pane> },
        { menuItem: 'Videojuegos', render: () => <Tab.Pane>{renderList(Listas, 'Juegos')}</Tab.Pane> },
    ];

    const renderList = (list, tipo) => {
        const verMasTardeItems = list
            .filter((item) => item.Tipo === tipo && item.Estatus === 'Ver más tarde')
            .map((item) => (
                <Card
                    key={item.ElementoID}
                    color="yellow"
                    raised
                    link
                    className="card-container"
                    onClick={() => handleCardClick(item.ElementoID, item.Tipo)}
                >
                    <Image src={item.Img || "https://via.placeholder.com/300x200"} className="card-image" />
                    <div className="card-title">{item.Titulo}</div>
                </Card>
            ));

        const completadosItems = list
            .filter((item) => item.Tipo === tipo && item.Estatus === 'Completado')
            .map((item) => (
                <Card
                    key={item.ElementoID}
                    color="yellow"
                    raised
                    link
                    className="card-container"
                    onClick={() => handleCardClick(item.ElementoID, item.Tipo)}
                >
                    <Image src={item.Img || "https://via.placeholder.com/300x200"} className="card-image" />
                    <div className="card-title">{item.Titulo}</div>
                </Card>
            ));

        return (
            <Segment style={{ color: 'black' }}>
                <h2>Ver más tarde</h2>
                <Card.Group itemsPerRow={5}>{verMasTardeItems}</Card.Group>

                <h2>Completados</h2>
                <Card.Group itemsPerRow={5}>{completadosItems}</Card.Group>

            </Segment>
        );
    };

    return (
        <>
            <Navbar />
            <Container className="emp-profile" style={{ background: `linear-gradient(to top, #000000 , #FFFFFF)`, color: 'black' }}>
                <Form>
                    <Grid >
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <div className="profile-img">
                                    <Image src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png" alt="pfp" />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <div className="profile-head">
                                    <h2>{User.username} {Ubicacion}</h2>
                                    <h4>Email: {User.email}</h4>
                                </div><br />

                                {isEditMode ? (
                                    <>
                                        <Input
                                            placeholder="Nuevo nombre de usuario"
                                            value={editedUser.username}
                                            onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                                        /><br /><br />
                                        <Input
                                            type="password"
                                            placeholder="Nueva Contraseña"
                                            value={editedUser.passwrd}
                                            onChange={(e) => setEditedUser({ ...editedUser, passwrd: e.target.value })}
                                        /><br /><br />

                                        <Button color="black" icon labelPosition="left" onClick={handleSaveChanges}>
                                            <Icon name="save outline" />
                                            Guardar cambios
                                        </Button>
                                        <Button color="red" icon labelPosition="left" onClick={handleEdit}> <Icon name="window close" />Cancelar</Button>
                                    </>

                                ) : (
                                    <>
                                        <Button color='black' icon labelPosition="left" onClick={handleEdit}>
                                            <Icon name="edit outline" />
                                            Editar datos
                                        </Button>
                                        <Button color="red" content="Cerrar sesión" onClick={logout} icon="log out"></Button>
                                    </>
                                )}

                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row >
                            <Grid.Column width={16} >
                                <Tab panes={panes} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Container>

        </>
    );
};
