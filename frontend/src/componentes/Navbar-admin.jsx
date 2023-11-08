import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function Navbar() {
    return (
        <>
            <header className="topnav">
                <a href="/inicio-admin">Usuarios</a>
                <a href="/peliculas-admin">Películas</a>
                <a href="/juegos-admin">Videojuegos</a>
                <a href="/anime-admin">Anime</a>
                <a href="/manga-admin">Manga</a>
                <div style={{ float: 'right' }}>
                    <a href="/login">
                        <Icon link size='large' name='user outline' />
                    </a>
                </div>
            </header>
        </>
    );
}
