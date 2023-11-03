import { Button } from "semantic-ui-react"

export default function AnimeDescripcion({ anime }) {
    return (
        <>
            <aside className="left-aside">
                <img src={anime.coverImage.large} alt={anime.title.romaji} />
                <br></br>
                <br></br>
                <Button content="Ver más tarde" icon='bookmark' labelPosition='left' compact color="blue" />{/* Si ya está en ver más tarde mostrar Eliminar / Marcar como completado */}

                <br></br>
                <br></br>
                <p>Fecha de inicio: {anime.startDate.year}</p>
                <p>Estatus: {anime.status}</p>
                <p>Episodios: {anime.episodes}</p>
                <p>Genero: {anime.genres.join(", ")}</p>

            </aside>
            <article className="middle-article">
                <h1 className="description-title">{anime.title.romaji}</h1>
                <h2>Sinopsis: </h2>
                <p>{anime.description}</p>
            </article>
        </>
    )

}