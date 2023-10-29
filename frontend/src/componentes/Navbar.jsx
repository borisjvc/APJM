import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function Navbar() {

    return (
        <>


            <header className="topnav">
                <a href="/">Inicio</a>
                <a href="/peliculas">Películas</a>
                <a href="/juegos">Videojuegos</a>
                <a href="/anime">Anime</a>
                <a href="/manga">Manga</a>
                <div style={{ float: 'right' }}>
                    <a href="/login"> <Icon link size='large' name='user outline' /> </a>
                </div>
            </header>
        </>

    )
}