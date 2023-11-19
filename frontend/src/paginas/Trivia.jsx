import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Radio, Button } from "semantic-ui-react";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/navbar";

const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

const cardStyle = {
    maxHeight: "600px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "left",
};

const resultadoFinalStyle = {
    marginTop: "20px",
    padding: "20px",
    border: "2px solid #F7B829",
    borderRadius: "10px",
    backgroundColor: "#22211F",
    color: "#FFFFFF",
    textAlign: "center",
};

export default function Trivia() {
    const [preguntas, setPreguntas] = useState([]);
    const [respuestasUsuario, setRespuestasUsuario] = useState({});
    const [resultado, setResultado] = useState({});
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [tiempoRestante, setTiempoRestante] = useState(10);
    const [preguntaAutomatica, setPreguntaAutomatica] = useState(false);

    useEffect(() => {
        setTiempoRestante(10);
        // Iniciar el temporizador de respuesta
        const temporizadorRespuesta = setInterval(() => {
            setTiempoRestante((prevTiempo) => prevTiempo - 1);
        }, 1000);

        // Iniciar el temporizador de cambio de pregunta automático
        const temporizadorCambioPregunta = setTimeout(() => {
            if (preguntaActual < preguntas.length - 1) {
                // Avanzar a la siguiente pregunta de forma automática
                setPreguntaActual(preguntaActual + 1);
            } else {
                // Llegamos a la última pregunta, mostrar resultado final
                setPreguntaActual(preguntas.length);
            }
            setPreguntaAutomatica(true);
        }, 10000);

        // Limpieza del temporizador de cambio de pregunta automático
        return () => {
            clearInterval(temporizadorRespuesta);
            clearTimeout(temporizadorCambioPregunta);

            // Desactivar el temporizador de cambio automático si estaba activo
            if (preguntaAutomatica) {
                setPreguntaAutomatica(false);
            }
        };
    }, [preguntaActual, preguntas, preguntaAutomatica]);

    const obtenerPreguntas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/trivia/list");
            const datosAPI = response.data.results;
            setPreguntas(datosAPI);
        } catch (error) {
            console.error("Error al obtener trivia: ", error);
        }
    };
    
    const reiniciarTrivia = () => {
        setRespuestasUsuario({});
        setResultado({});
        setPreguntaActual(0);
        setTiempoRestante(10);
        setPreguntaAutomatica(false);
    };

    useEffect(() => {
        obtenerPreguntas();
    }, []);

    const handleRespuestaChange = (respuestaSeleccionada) => {
        setRespuestasUsuario({
            ...respuestasUsuario,
            [preguntaActual]: respuestaSeleccionada,
        });
    };

    const verificarRespuesta = () => {
        const pregunta = preguntas[preguntaActual];
        const respuestaUsuario = respuestasUsuario[preguntaActual];
        const esCorrecta = respuestaUsuario === pregunta.correct_answer;

        setResultado({
            ...resultado,
            [preguntaActual]: esCorrecta,
        });
    };

    const siguientePregunta = () => {
        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual(preguntaActual + 1);
        } else {
            // Llegamos a la última pregunta, mostrar resultado final
            setPreguntaActual(preguntas.length);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Trivia</h1>
            {preguntas.length > 0 && preguntaActual < preguntas.length && (
                <Card style={cardStyle}>
                    <Card.Content>
                        <Card.Header>{decodeHTML(preguntas[preguntaActual].question)}</Card.Header>
                        <p>Tiempo restante: {tiempoRestante} segundos</p>
                    </Card.Content>
                    <Card.Content>
                        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                            {[...preguntas[preguntaActual].incorrect_answers, preguntas[preguntaActual].correct_answer].map(
                                (respuesta, respuestaIndex) => (
                                    <li key={respuestaIndex}>
                                        <Radio
                                            label={decodeHTML(respuesta)}
                                            name={`pregunta${preguntaActual}`}
                                            value={respuesta}
                                            checked={respuestasUsuario[preguntaActual] === respuesta}
                                            onChange={() => handleRespuestaChange(respuesta)}
                                        />
                                    </li>
                                )
                            )}
                        </ul>
                    </Card.Content>
                    {resultado[preguntaActual] !== undefined ? (
                        <div style={{ textAlign: "center" }}>
                            <p>Respuesta: {resultado[preguntaActual] ? "Correcta" : "Incorrecta"}</p>
                            <Button color="yellow" onClick={siguientePregunta}>
                                Siguiente Pregunta
                            </Button>
                        </div>
                    ) : (
                        <Button color="green" onClick={verificarRespuesta}>
                            Verificar Respuesta
                        </Button>
                    )}
                </Card>
            )}
            {preguntaActual === preguntas.length && (
                <div style={resultadoFinalStyle}>
                    <h2>Resultado Final:</h2>
                    <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                        {preguntas.map((pregunta, index) => (
                            <li key={index}>
                                Pregunta {index + 1}:{" "}
                                <span style={{ color: resultado[index] ? "#00FF00" : "#FF0000" }}>
                                    {resultado[index] ? "Correcta" : "Incorrecta"}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <Button color="yellow" onClick={reiniciarTrivia}>
                        Volver a Jugar
                    </Button>
                </div>
            )}
        </div>
    );
}
