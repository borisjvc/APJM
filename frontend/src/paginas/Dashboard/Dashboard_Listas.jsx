import React, { useState, useEffect } from "react";
import { Table, Button, Icon, Modal, Input } from "semantic-ui-react";
import axios from "axios";
import NavbarDash from "../../componentes/Navbar-admin";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function DashListas() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [listas, setListas] = useState([]);
    const [selectedLista, setSelectedLista] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchListas = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/listas`);
            setListas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        verificarAcceso();
        fetchListas();
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

    const handleEditClick = (lista) => {
        setSelectedLista(lista);
        setModalOpen(true);
    };

    const handleDeleteClick = async (lista) => {
        try {
            await axios.delete(`http://localhost:3001/listas/eliminar/${lista.UsuarioID}/${lista.ElementoID}/${lista.Tipo}`)
            fetchListas();
        } catch (error) {
            console.error("Error al eliminar la lista: ", error);
        }
    };

    const handleModalClose = () => {
        setSelectedLista(null);
        setModalOpen(false);
    };

    const handleSaveChanges = () => {
        setModalOpen(false);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredListas = listas.filter((lista) =>
        Object.values(lista).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>
            <NavbarDash />
            <Input
                icon="search"
                placeholder="Buscar por usuario..."
                onChange={handleSearchChange}
            />
            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Usuario</Table.HeaderCell>
                        <Table.HeaderCell>Elemento</Table.HeaderCell>
                        <Table.HeaderCell>Estatus</Table.HeaderCell>
                        <Table.HeaderCell>Tipo</Table.HeaderCell>
                        <Table.HeaderCell>Editar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredListas.map((lista, index) => (
                        <Table.Row key={lista.ID}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{lista.NombreUsuario}</Table.Cell>
                            <Table.Cell>{lista.Titulo}</Table.Cell>
                            <Table.Cell>{lista.Estatus}</Table.Cell>
                            <Table.Cell>{lista.Tipo}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    color="blue"
                                    icon
                                    onClick={() => handleEditClick(lista)}
                                >
                                    <Icon name="edit outline" />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    color="red"
                                    icon
                                    onClick={() => handleDeleteClick(lista)}
                                >
                                    <Icon name="trash alternate outline" />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <Modal.Header>Editar Lista</Modal.Header>
                <Modal.Content>
                    {/* Aquí puedes agregar los campos de edición */}
                    {selectedLista && (
                        <div>
                            <p>ID: {selectedLista.ID}</p>
                            {/* Otros campos */}
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={handleModalClose}>
                        Cerrar
                    </Button>
                    <Button
                        positive
                        icon="checkmark"
                        labelPosition="right"
                        content="Guardar Cambios"
                        onClick={handleSaveChanges}
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
}
