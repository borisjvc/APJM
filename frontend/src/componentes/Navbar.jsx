import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';

export default function Navbar() {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSearchBar = () => {
        setSearchVisible(!searchVisible);
    }

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = () => {
        // Falta implementar la busqueda usando las apis
        console.log('Search Query:', searchQuery);
    }

    return (
        <>
            <header className="topnav">
                <a href="/">Inicio</a>
                <a href="/peliculas">Películas</a>
                <a href="/juegos">Videojuegos</a>
                <a href="/anime">Anime</a>
                <a href="/manga">Manga</a>
                <div style={{ float: 'right' }}>
                    <a href="/login">
                        <Icon link size='large' name='user outline' />
                    </a>
                    {searchVisible ? (
                        <Input
                            icon="search"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className={`search-bar ${searchVisible ? 'search-bar-expanded' : ''}`}
                        />
                    ) : (
                        <a onClick={toggleSearchBar}>
                            <Icon link size='large' name='search' />
                        </a>
                    )}
                </div>
            </header>
        </>
    );
}
