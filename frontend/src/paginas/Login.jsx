import React, { useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

const LoginForm = () => {
    return (
        <Grid textAlign="center">
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

                        <Button color="green" fluid size="large">
                            Iniciar sesión
                        </Button>
                        <Button color="red" fluid size="large">
                            Cancelar
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default LoginForm;
