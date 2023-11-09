import React, { useEffect, useState } from "react";
import { Button, Icon, Table, Modal, Input } from "semantic-ui-react";
import axios from "axios";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        id: "",
        username: "",
        email: "",
        rol: "",
    });

    useEffect(() => {
        axios.get("http://localhost:3001/usuarios")
            .then((response) => {
                const formattedUsers = response.data.map((user) => ({
                    id: user.ID,
                    username: user.Username,
                    email: user.Email,
                    rol: user.Rol,
                }));

                setUsuarios(formattedUsers);
            })
            .catch((error) => {
                console.error("Error al obtener usuarios: ", error);
            });
    }, []);

    // Manejador para abrir el modal de edición
    function handleEdit(user) {
        setSelectedUser(user);
        setEditedUser({
            id: user.id,
            username: user.username,
            email: user.email,
            rol: user.rol,
        });
        setIsModalOpen(true);
    }

    // Manejador para cerrar el modal
    function handleCloseModal() {
        setSelectedUser(null); // Limpia el usuario seleccionado
        setIsModalOpen(false); // Cierra el modal
    }

    function handleSaveChanges() {
        // Implementa la lógica para enviar los cambios a la base de datos
        axios.put(`http://localhost:3001/usuarios/${editedUser.id}`, editedUser)
            .then((response) => {
                // Actualizar la lista de usuarios después de la edición
                axios.get("http://localhost:3001/usuarios")
                    .then((response) => {
                        setUsuarios(response.data);
                    })
                    .catch((error) => {
                        console.error("Error al obtener usuarios: ", error);
                    });

                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al guardar los cambios: ", error);
            });
    }

    function handleDelete() {
        //borrar usuario seleccionado de la tabla
        console.log("usuario eliminado")
    }

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
                    {usuarios.map((user) => (
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.rol}</Table.Cell>
                            <Table.Cell>
                                <Button color="blue" icon onClick={handleEdit}>
                                    <Icon name="edit outline" />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button color="red" icon onClick={handleDelete}>
                                    <Icon name="trash alternate outline" />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Modal.Header>Editar Usuario</Modal.Header>
                <Modal.Content>
                    {selectedUser && (
                        <div>
                            <Input
                                label="Nombre de usuario"
                                value={editedUser.username}
                                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                            />
                            <Input
                                label="Correo electrónico"
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            />
                            <Input
                                label="Rol"
                                value={editedUser.rol}
                                onChange={(e) => setEditedUser({ ...editedUser, rol: e.target.value })}
                            />
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button color="blue" onClick={handleSaveChanges}>Guardar Cambios</Button>
                    <Button color="red" onClick={handleCloseModal}>Cancelar</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
