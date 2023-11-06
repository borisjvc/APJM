import React from 'react';
import { Card, Dimmer, Loader, Image } from 'semantic-ui-react';

const PlaceholderCard = () => (
  <Card color="grey" raised className="card-container">
    <Dimmer active inverted>
      <Loader content="Cargando..." />
    </Dimmer>
    <Image src="https://via.placeholder.com/300x200" className="card-image" />
  </Card>
);

export default PlaceholderCard;
