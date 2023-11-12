import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Segment, Header } from "semantic-ui-react";
import axios from "axios";

export default function Registro() {
    const initialValues = {
        Username: "",
        Email: "",
        Passwrd: "",
    };

    const handleRegistro = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("http://localhost:3001/usuarios", values);
            console.log("Registro exitoso", response.data);
        } catch (error) {
            console.error("Error al registrar usuario", error.response.data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment stacked>
                    <Formik initialValues={initialValues} onSubmit={handleRegistro}>
                        {({ isSubmitting }) => (
                            <Form size="large">
                                <Header as="h2" color="grey" textAlign="center">
                                    Crear cuenta
                                </Header>
                                <Field
                                    fluid
                                    name="Username"
                                    type="text"
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Nombre de usuario"
                                    as={Form.Input}
                                    required
                                />
                                <Field
                                    fluid
                                    name="Email"
                                    type="email"
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="Correo electrónico"
                                    as={Form.Input}
                                    required
                                />
                                <Field
                                    fluid
                                    name="Passwrd"
                                    type="password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Contraseña"
                                    as={Form.Input}
                                    required
                                />
                                <Button color="grey" type="submit" disabled={isSubmitting}>
                                    Crear cuenta
                                </Button>
                                <Button color="red" href="/">
                                    Cancelar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </Grid.Column>
        </Grid>
    );
};


