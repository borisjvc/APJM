import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const LoginForm = () => {
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [formValues, setFormValues] = useState({
        correo: '',
        password: '',
    });

    const navigate = useNavigate();

    const [notificationVisible, setNotificationVisible] = useState(false);

    useEffect(() => {

    }, [user]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues, [name]: value,
        });
    };

    const handleLogin = () => {
        const userData = {
            Email: formValues.correo,
            Passwrd: formValues.password
        };

        // Realizar la solicitud POST a la API para iniciar sesión
        axios.post("http://localhost:3001/usuarios/login", userData)
            .then(response => {
                if (response.data.message == 'Login exitoso') {
                    const token = response.data.token;
                    localStorage.setItem('token', token);

                    if(decodedToken.rol == "Administrador")
                        navigate("/dashboard/usuarios");
                    else
                        navigate("/");
                } else {
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                console.error("Error al iniciar sesión: ");
                setNotificationVisible(true);
            });
    };

    const responseMessage = (response) => {
        setUser(response);
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log("error", error);
    };


    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form error size="large">
                    <Segment stacked>
                        <Header as="h2" color="grey" textAlign="center">
                            Iniciar sesión
                        </Header>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            name="correo"
                            placeholder="Correo electrónico"
                            value={formValues.correo}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Contraseña"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        {notificationVisible && (
                            <Message
                                error
                                header='Error en el formulario'
                                content='Datos no encontrados'
                            />)}
                        <br></br>
                        <br></br>
                        <Button color="grey" onClick={handleLogin} >
                            Iniciar sesión
                        </Button>
                        <Button color="red" href="/">
                            Cancelar
                        </Button>
                        <Link to="/registro">
                            <Button color="blue" appearance="subtle">Crear cuenta</Button>
                        </Link>
                        <br />
                        <br />

                        <div>
                            <br />
                            <br />
                            {profile ? (
                                <div>
                                    <img src={profile.picture} alt="user image" />
                                    <h3>User Logged in</h3>
                                    <p>Name: {profile.name}</p>
                                    <p>Email Address: {profile.email}</p>
                                    <br />
                                    <br />
                                    <button onClick={logOut}>Log out</button>
                                </div>
                            ) : (
                                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                            )}

                        </div>
                        <div>
                            <br />
                            <br />

                        </div>

                    </Segment>

                </Form>

            </Grid.Column>
        </Grid>

    );
};

export default LoginForm;
