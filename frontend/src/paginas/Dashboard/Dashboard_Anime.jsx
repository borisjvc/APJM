import React, { useState, useEffect } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import axios from "axios";

export default function DashAnime() {
    const [Animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAnimes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/anime/list?page=${currentPage}`);
            setAnimes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAnimes();
    }, []);

    return (
        <>
            <Table celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Titulo</Table.HeaderCell>
                        <Table.HeaderCell>Descripcion</Table.HeaderCell>
                        <Table.HeaderCell>Imagen (Url)</Table.HeaderCell>
                        <Table.HeaderCell>Lista de generos</Table.HeaderCell>
                        <Table.HeaderCell>Fecha de lanzamiento</Table.HeaderCell>
                        <Table.HeaderCell>Editar</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {Animes.map((animes) => (
                        <Table.Row key={animes.id}>
                            <Table.Cell>{animes.id}</Table.Cell>
                            <Table.Cell>{animes.title.romaji}</Table.Cell>
                            <Table.Cell>{animes.genres ? animes.genres.join(", ") : "No genres"}</Table.Cell>
                            <Table.Cell>{animes.coverImage.large}</Table.Cell>
                            <Table.Cell>{animes.episodes}</Table.Cell>
                            <Table.Cell>{animes.status}</Table.Cell>
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
