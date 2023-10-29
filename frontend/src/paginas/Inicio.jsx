import React from "react";
import { Card, Image } from 'semantic-ui-react'

export default function Inicio() {
    const src = 'https://wallpapers.com/images/hd/4k-sharp-colorful-clouds-364l86a13wi6hkqg.jpg';

    return (
        <article>
            <div className="banner-destacado">
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/NNxYkU70HPurnNCSiCjYAmacwm.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/2urdwqEL9FRkGMKAkhfvWTALG00.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/8Im6DknDVxRiGXc5t8rVOJyzuNx.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
                <Image
                    src="https://www.themoviedb.org/t/p/w1280/voHUmluYmKyleFkTu3lOXQG702u.jpg"
                    alt="Película Destacada"
                    centered
                    rounded
                    size="medium"
                    href="/anime/a"
                ></Image>
            </div>
            <br></br>
            <Card.Group itemsPerRow={4}>
                <Card color='yellow' raised link image={src} href="/anime/a" />
                <Card color='yellow' raised link image={src} href="/anime/a" />
                <Card color='yellow' raised link image={src} href="/anime/a" />
                <Card color='yellow' raised link image={src} href="/anime/a" />
                <Card color='yellow' raised link image={src} href="/anime/a" />
                <Card color='yellow' raised link image={src} href="/anime/a" />
            </Card.Group>
        </article>
    )
}