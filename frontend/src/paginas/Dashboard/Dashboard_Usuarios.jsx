import React, { useEffect, useState } from "react";
import { Button, Icon, Table, Modal, Input, Dropdown, Label } from "semantic-ui-react";
import axios from "axios";
import NavbarDash from "../../componentes/Navbar-admin";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [newUser, setNewUser] = useState({
        Username: "",
        Email: "",
        Passwrd: "",
        rol: "Usuario",
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        id: "",
        username: "",
        email: "",
        passwrd: "",
        rol: "Usuario",
    });

    useEffect(() => {
        verificarAcceso();
        obtenerUsuarios();
    }, []);

    const verificarAcceso = () => {
        if (!token) {
            navigate("/login");
        } else {
            const decodedToken = jwtDecode(token);
            if (decodedToken.rol == 'Usuario')
                navigate('/');
        }
    }

    const obtenerUsuarios = () => {
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
    };

    const handleEdit = (user) => {
        axios.get(`http://localhost:3001/usuarios/${user.id}`)
            .then((response) => {
                const userData = response.data[0];
                setSelectedUser(user);
                setEditedUser({
                    id: userData.ID,
                    username: userData.Username,
                    email: userData.Email,
                    passwrd: userData.passwrd,
                    rol: userData.Rol,
                });
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error("Error al obtener datos del usuario: ", error);
            });
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const handleSaveChanges = () => {
        axios.put(`http://localhost:3001/usuarios/${editedUser.id}`, {
            Username: editedUser.username,
            Passwrd: editedUser.passwrd,
            Email: editedUser.email,
            Rol: editedUser.rol,
        })
            .then((response) => {
                obtenerUsuarios(); // Obtener la lista actualizada de usuarios
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error al guardar los cambios: ", error);
            });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/usuarios/${id}`);
        obtenerUsuarios();
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddUser = () => {
        axios.post("http://localhost:3001/usuarios", newUser)
            .then((response) => {
                obtenerUsuarios();
                setIsAddModalOpen(false);
                setNewUser({
                    Username: "",
                    Email: "",
                    Passwrd: "",
                    rol: "Usuario",
                });
            })
            .catch((error) => {
                console.error("Error al agregar el usuario: ", error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsuarios = usuarios.filter((usuario) =>
        Object.values(usuario).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    return (
        <>
            <NavbarDash />
            <Input
                icon="search"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
            /><br /><br />
            <Button content="Agregar usuario" color="blue" icon='add' onClick={handleOpenAddModal}></Button>
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
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.rol}</Table.Cell>
                            <Table.Cell>
                                <Button color="blue" icon onClick={() => handleEdit(user)}>
                                    <Icon name="edit outline" />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button color="red" icon onClick={() => handleDelete(user.id)}>
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
                    <Input
                        label="Nombre de usuario"
                        value={editedUser.username}
                        onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    />
                    <br /><br />
                    <Input
                        label="Correo electrónico"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    />
                    <br /><br />
                    <Label content="Rol" />
                    <Dropdown
                        label="Rol"
                        selection
                        options={[
                            { key: 'user', text: 'Usuario', value: 'Usuario' },
                            { key: 'admin', text: 'Administrador', value: 'Administrador' },
                        ]}
                        value={editedUser.rol}
                        onChange={(e, { value }) => setEditedUser({ ...editedUser, rol: value })}
                    />
                </Modal.Content>

                <Modal.Actions>
                    <Button color="blue" onClick={handleSaveChanges}>Guardar Cambios</Button>
                    <Button color="red" onClick={handleCloseModal}>Cancelar</Button>
                </Modal.Actions>
            </Modal>

            <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
                <Modal.Header>Agregar Usuario</Modal.Header>
                <Modal.Content>
                    <Input
                        label="Nombre de usuario"
                        value={newUser.Username}
                        onChange={(e) => setNewUser({ ...newUser, Username: e.target.value })}
                    />
                    <br /><br />
                    <Input
                        label="Correo electrónico"
                        value={newUser.Email}
                        onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
                    />
                    <br /><br />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={newUser.Passwrd}
                        onChange={(e) => setNewUser({ ...newUser, Passwrd: e.target.value })}
                    />
                    <br /><br />
                    <Dropdown
                        label="Rol"
                        selection
                        options={[
                            { key: 'user', text: 'Usuario', value: 'Usuario' },
                            { key: 'admin', text: 'Administrador', value: 'Administrador' },
                        ]}
                        value={newUser.rol}
                        onChange={(e, { value }) => setNewUser({ ...newUser, rol: value })}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" onClick={handleAddUser}>Agregar Usuario</Button>
                    <Button color="red" onClick={handleCloseAddModal}>Cancelar</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
