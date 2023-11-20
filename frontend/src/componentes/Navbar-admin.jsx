import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function NavbarDash() {
    const token = localStorage.getItem('token');
    return (
        <>
            <header className="topnav">
                <a href="/dashboard/usuarios">Usuarios</a>
                <a href="/dashboard/listas">Listas</a>
                <div style={{ float: 'right' }}>
                    {!token ? (
                        <a href="/login">
                            <Icon link size='large' name='user outline' />
                        </a>
                    ) : (
                        <a href="/perfil">
                            <Icon link size='large' name='user outline' />
                        </a>)
                    }
                </div>
            </header>
        </>
    );
}
