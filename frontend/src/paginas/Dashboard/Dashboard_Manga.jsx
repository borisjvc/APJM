import React, { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";

export default function DashManga() {
    const [Mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    const fetchMangas = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/manga/list?page=${currentPage}`);
            setMangas(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMangas();
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
                        <Table.HeaderCell>Cantidad de episodios</Table.HeaderCell>
                        <Table.HeaderCell>Estatus</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {Mangas.map((manga) => (
                        <Table.Row key={manga.node.id}>
                            <Table.Cell>{manga.node.id}</Table.Cell>
                            <Table.Cell>{manga.node.title}</Table.Cell>
                            <Table.Cell>{manga.node.description}</Table.Cell>
                            <Table.Cell>{manga.node.image_url}</Table.Cell>
                            <Table.Cell>{manga.node.genres ? manga.node.genres.join(", ") : "No genres"}</Table.Cell>
                            <Table.Cell>{manga.node.release_date}</Table.Cell>
                            <Table.Cell>{manga.node.episodes}</Table.Cell>
                            <Table.Cell>{manga.node.status}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}
