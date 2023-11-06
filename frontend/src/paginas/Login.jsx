
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';



const LoginForm = () => {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };


    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="grey" textAlign="center">
                    Iniciar sesión
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Nombre de usuario"
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Contraseña"
                            type="password"
                        />
                        <br></br>
                        <br></br>
                        <Button color="grey" fluid size="large">
                            Iniciar sesión
                        </Button>
                        <Button color="yellow" fluid size="large">
                            Cancelar
                        </Button>
                        <div>
                            <br />
                            <br />
                            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                        </div>
                        <div>
                            <h2>Google Login</h2>
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
                                <button onClick={() => login()}>Sign in with Google 🚀 </button>
                            )}
                        </div>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>

    );
};

export default LoginForm;
