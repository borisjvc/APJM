import React, { useState } from "react";
import axios from "axios";
import Navbar from "../componentes/navbar";
import { Button, Grid, Segment, Header, Form, Message , Divider } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


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
            await axios.post(`http://localhost:3001/correo/enviar`, formValues.Email);
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

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            await createProfile(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });


    async function createProfile(user) {
        if (user) {
            try {
                const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                });

                const datos = {
                    Email: response.data.email,
                    Passwrd: response.data.id,
                    Username: response.data.name
                }

                axios.post("http://localhost:3001/usuarios/Google", datos)
                    .then(response => {
                        if (response.data.message == 'Login exitoso') {
                            const token = response.data.token;
                            localStorage.setItem('token', token);
                            const decodedToken = jwtDecode(token);

                            if (decodedToken.rol == "Administrador")
                                navigate("/dashboard/usuarios");
                            else
                                navigate("/");
                        } else if (response.data.message == 'Registro exitoso') {
                            axios.post(`http://localhost:3001/correo/enviar`,  datos.Email);
                            navigate('/');
                        }

                    })
            } catch (error) {
                console.log("Error al obtener el perfil del usuario:", error);
            }
        }
    }

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
                            <Divider horizontal content="O" />
                            <Button icon="google" onClick={login}>Crear cuenta con Google</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    );
};
