import React, { useState } from 'react';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
import { SearchMovie } from '../../../types';
import CardFront from './CardFront';
import CardBack from './CardBack';

export interface CardWrapperProps {
    movie: SearchMovie;
    index: number;
    windowWidth: number;
    cardsPerRow: number;
}

const Style = styled.div`
    position: relative;
`;

const CardWrapper: React.FC<CardWrapperProps> = ({ movie, index, windowWidth, cardsPerRow }) => {
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return (
        <Style onClick={() => set((state) => !state)}>
            <CardFront
                poster={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                index={index}
                windowWidth={windowWidth}
                cardsPerRow={cardsPerRow}
                opacity={opacity}
                transform={transform}
            />
            <CardBack
                index={index}
                windowWidth={windowWidth}
                cardsPerRow={cardsPerRow}
                flipped={flipped}
                title={movie.original_title}
                date={movie.release_date}
                overview={movie.overview}
                opacity={opacity}
                transform={transform}
            />
        </Style>
    );
};

export default CardWrapper;
