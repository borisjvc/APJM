import { Button } from "semantic-ui-react"

export default function JuegosDescripcion({ juego }) {
    const platformNames = juego.parent_platforms.map((platform) => platform.platform.name).join(", ");

    return (
        <>
            <aside className="left-aside">
                <img src={juego.background_image} alt={juego.name} className="game-image" />
                <br></br>
                <br></br>
                <Button content="Jugar más tarde" icon='bookmark' labelPosition='left' compact color="blue" />{/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}

                <br></br>
                <br></br>
                <p>Fecha de lanzamiento: {juego.released}</p>
                <p>Plataformas: {platformNames}</p>
                <p>Desarrollador: {juego.developers[0].name}</p>

            </aside>
            <article className="middle-article">
                <h1 className="description-title">{juego.name}</h1>
                <h2>Descripción: </h2>
                {juego.description_raw}
            </article>
        </>
    )

}