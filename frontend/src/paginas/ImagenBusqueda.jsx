import React, { useState } from 'react';
import axios from 'axios';
import { Card, Image, Message, Modal, Button, Input } from 'semantic-ui-react';
import Navbar from '../componentes/navbar';

const ImageSearch = () => {
    const [file, setFile] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [error, setError] = useState('');
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(
                    'https://api.trace.moe/search',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                setResultados(response.data.result);
                setError('');
            } catch (error) {
                setError('Error al enviar la imagen. Por favor, intenta de nuevo.');
                console.error('Error al enviar la imagen:', error);
            }
        } else {
            setError('Por favor, selecciona un archivo antes de cargar.');
            console.warn('Por favor, selecciona un archivo antes de cargar.');
        }
    };

    const handleVideoClick = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setSelectedVideo('');
        setVideoModalOpen(false);
    };

    const getCardColor = (similarity) => {
        if (similarity >= 0.9) {
            return 'green';
        } else if (similarity >= 0.8) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    return (
        <>
            <Navbar />
            <Input type="file" onChange={handleFileChange}/>
            <Button color="blue" onClick={handleUpload}>
                Subir imagen
            </Button>

            {error && <Message negative>{error}</Message>}

            <Card.Group itemsPerRow={5}>
                {resultados.map((anime, index) => (
                    <Card
                        key={index}
                        color={getCardColor(anime.similarity)}
                        raised
                        link
                        className="card-container"
                        onClick={() => handleVideoClick(anime.video)}>
                        <Image src={anime.image} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{anime.filename}</Card.Header>
                            <Card.Meta>Similaridad: {Math.round(anime.similarity * 100)}%</Card.Meta>
                            {anime.episode && <Card.Meta>Episodio: {anime.episode}</Card.Meta>}
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>

            <Modal open={videoModalOpen} onClose={closeVideoModal} centered={false} size="small">
                <Modal.Content>
                    <video controls width="100%" height="auto" autoPlay>
                        <source src={selectedVideo} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                    </video>
                </Modal.Content>
            </Modal>
            
        </>
    );
};

export default ImageSearch;
