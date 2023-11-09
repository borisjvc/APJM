import React from "react";
import { Button, Icon, Table } from "semantic-ui-react";

export default function DashPeliculas() {
    const filteredUsuarios = [1, 2];

    return (
        <>
            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Nombre de usuario</Table.HeaderCell>
                        <Table.HeaderCell>Correo electrónico</Table.HeaderCell>
                        <Table.HeaderCell>Rol</Table.HeaderCell>
                        <Table.HeaderCell>Editar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredUsuarios.map((user) => (
                        <Table.Row key={user}>
                            <Table.Cell>id</Table.Cell>
                            <Table.Cell>nombre</Table.Cell>
                            <Table.Cell>correo</Table.Cell>
                            <Table.Cell>rol</Table.Cell>
                            <Table.Cell>
                                <Button color="blue" icon>
                                    <Icon name="edit outline" />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button color="red" icon>
                                    <Icon name="trash alternate outline" />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}
