import React, { useState } from "react";
import axios from "axios";
import Navbar from "../componentes/navbar";
import { Button, Grid, Segment, Header, Form, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        Email: '',
        Passwrd: '',
        Username: '',
    });

    const handleRegistro = async () => {
        // Reiniciar notificaciones
        setNotificationVisible(false);
        setError(false);

        // Verificar que ingrese todos los datos
        if (!formValues.Email || !formValues.Passwrd || !formValues.Username) {
            setNotificationVisible(true);
            return;
        }
        
        try {
            await axios.post("http://localhost:3001/usuarios", formValues);
            await axios.post(`http://localhost:3001/correo/enviar`,formValues.Email );
            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 3000);


        } catch (error) {
            console.error("Error al registrar usuario", error.response.data);
            setError(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <>
            <Navbar />
            <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form error size="large" >
                        <Segment stacked>
                            <Header as="h2" color="black" textAlign="center">
                                Crear cuenta
                            </Header>
                            <Form.Input
                                fluid
                                icon="mail"
                                iconPosition="left"
                                name="Email"
                                placeholder="Correo electrónico"
                                value={formValues.Email}
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                name="Username"
                                placeholder="Nombre de usuario"
                                value={formValues.Username}
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Contraseña"
                                type="password"
                                name="Passwrd"
                                value={formValues.Passwrd}
                                onChange={handleInputChange}
                            />
                            {notificationVisible && (
                                <Message
                                    error
                                    header='Error en el formulario'
                                    content='Por favor, completa todos los campos.'
                                />
                            )}
                            {error && (
                                <Message
                                    error
                                    header='Error al crear la cuenta'
                                    content='Existe una cuenta con el mismo correo.'
                                />
                            )}
                            {success && (
                                <Message
                                    positive
                                    header='Registro exitoso'
                                    content='La cuenta se ha creado correctamente. Redireccionando...'
                                />
                            )}
                            <br></br>
                            <br></br>
                            <Button color="blue" onClick={handleRegistro} >
                                Crear cuenta
                            </Button>
                            <Button color="red" href="/">
                                Cancelar
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    );
};
