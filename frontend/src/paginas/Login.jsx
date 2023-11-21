import { Button, Form, Grid, Header, Segment, Message, Divider } from 'semantic-ui-react';
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        correo: '',
        password: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token)
            navigate("/perfil")
    }, []);

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
                    const decodedToken = jwtDecode(token);

                    if (decodedToken.rol == "Administrador")
                        navigate("/dashboard/usuarios");
                    else
                        navigate("/");
                } else {
                    setNotificationVisible(true);
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                console.error("Error al iniciar sesión: ");

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
                        }else if(response.data.message == 'Registro exitoso'){
                            setFormValues({correo: response.data.user.Email, password: response.data.user.Passwrd})
                        }
                        handleLogin();
                    })
            } catch (error) {
                console.log("Error al obtener el perfil del usuario:", error);
            }
        }
    }
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
                        <Divider horizontal content="O" />
                        <Button icon="google" onClick={login}>Iniciar sesión con Google</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    );
};

export default LoginForm;
