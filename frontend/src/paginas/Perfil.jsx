import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Image, Tab, Form, Button, Card, Icon } from 'semantic-ui-react';

const Perfil = () => {
    const userId = 1;
    const [userData, setUserData] = useState([]);
    const [Listas, setListas] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/usuarios/${userId}`)
            .then((response) => {
                setUserData(response.data[0]);
            })
            .catch((error) => {
                console.error("Error al obtener el perfil del usuario: ", error);
            });
        axios.get(`http://localhost:3001/usuarios/listas/${userId}`)
            .then((response) => {
                setListas(response.data[0]);
            })
            .catch((error) => {
                console.error("Error al obtener listas del usuario: ", error);
            });
    }, [userId]);

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
        { menuItem: 'Movies', render: () => <Tab.Pane>{renderList(userLists.movies)}</Tab.Pane> },
        { menuItem: 'Video Games', render: () => <Tab.Pane>{renderList(userLists.videoGames)}</Tab.Pane> },
    ];

    const renderList = (list) => (
        <Card.Group>
            {list.map((item, index) => (
                <Card key={index}>
                    <Card.Content>
                        <Card.Header>{item}</Card.Header>
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
                                <h2>{userData.Username} </h2>
                                <h4>Email: {userData.Email}</h4>
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
                            <Tab panes={panes} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </Container>
    );
};

export default Perfil;
