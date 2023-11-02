import React from 'react';
import { Icon } from 'semantic-ui-react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="left-content">
          <h3>Contactanos</h3>
          <div className='list'>
            <Icon link size='large' name='instagram'/>
            <Icon link size='large' name='twitter' />
            <Icon link size='large' name='facebook' />
            <Icon link size='large' name='youtube' />
            <Icon link size='large' name='github' />
          </div>
        </div>

        <div className="right-content">
          <div>
            <h3>Cuenta</h3>
            <div className="list">
              <a href="/registro">Crear una cuenta</a>
              <br></br>
              <a href="/login">Iniciar sesión</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
