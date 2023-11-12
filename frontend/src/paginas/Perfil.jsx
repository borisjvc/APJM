import React, { useEffect, useState } from "react";
import { Container, Segment, Header, Grid, Button, Icon } from "semantic-ui-react";
import axios from "axios";


export default function Perfil() {
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

    return (
        <Container>
            <Segment raised>
                <Grid columns={2} stackable>
                    <Grid.Column width={4}>
                        <Header as="h2">
                            {userData.Username}
                        </Header>
                        <p>Correo Electrónico: {userData.Email}</p>
                        <Button primary icon labelPosition="left" onClick={handleEdit}>
                            <Icon name="edit outline" />
                            Editar Datos
                        </Button>
                        {isEditMode && (
                            <Button color="green" icon labelPosition="left" onClick={handleSaveChanges}>
                                <Icon name="save outline" />
                                Guardar Cambios
                            </Button>
                        )}
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Header as="h2">Listas creadas</Header>
                        {/* Aquí puedes mostrar las listas del usuario */}
                        <p>Lista de Anime: [Lista de Anime del Usuario]</p>
                        <p>Lista de Manga: [Lista de Manga del Usuario]</p>
                        {/* Puedes personalizar esta sección según tus necesidades */}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Container>
    );
}