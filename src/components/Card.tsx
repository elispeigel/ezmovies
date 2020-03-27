import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { SearchMovie } from '../types';
import { HEIGHT, WIDTH, GAP, WHITE, BLACK } from '../constants';

interface StyleCardProps {
    poster?: string;
    index?: number;
    windowWidth?: number;
    flipped?: boolean;
    cardsPerRow?: number;
}

interface CardProps {
    movie: SearchMovie;
    index: number;
    windowWidth: number;
    cardsPerRow: number;
}

const calculateLeft = (width: number, index = 0, windowWidth = 0, cardsPerRow = 0) => {
    const calculatedIndex = index > cardsPerRow - 1 ? index % cardsPerRow : index;
    const cardsWidth = (WIDTH + GAP) * cardsPerRow - GAP;
    const viewPortWidthHelper = (windowWidth - cardsWidth) / 2;
    return width * calculatedIndex + viewPortWidthHelper;
};

const calculateTop = (height: number, index = 0, cardsPerRow = 0) => {
    const calculatedRow = Math.floor(index / cardsPerRow);
    return height * calculatedRow;
};

const CardHolder = styled.div`
    position: relative;
`;

const StyledCard = styled(animated.div)<StyleCardProps>`
    position: absolute;
    top: ${({ index, cardsPerRow }) => calculateTop(HEIGHT, index, cardsPerRow)}px;
    left: ${({ index, windowWidth, cardsPerRow }) => calculateLeft(WIDTH, index, windowWidth, cardsPerRow)}px;
    background-size: cover;
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
    will-change: transform, opacity;
    cursor: ${({ flipped }) => (flipped ? `auto` : `default`)};
`;

const CardFront = styled(StyledCard)`
    background-image: ${({ poster }) => `url(${poster})`};
`;

const CardBack = styled(StyledCard)`
    background: ${BLACK};
    overflow-y: auto;
`;

const InfoHolder = styled.div`
    padding: 30px;
`;

const CardTitle = styled.h1`
    color: ${WHITE};
    font-family: Eskell;
    font-size: 36px;
`;

const CardOverview = styled.p`
    color: ${WHITE};
    font-family: Fakt;
    font-size: 14px;
`;

const CardDate = styled.p`
    color: white;
    font-size: 18px;
    font-family: Fakt;
`;

const Card: React.FC<CardProps> = ({ movie, index, windowWidth, cardsPerRow }) => {
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return (
        <CardHolder onClick={() => set((state) => !state)}>
            {movie.poster_path && (
                <CardFront
                    style={{ opacity: opacity.interpolate((o: any) => 1 - o), transform }}
                    poster={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    index={index}
                    windowWidth={windowWidth}
                    cardsPerRow={cardsPerRow}
                />
            )}
            <CardBack
                style={{ opacity, transform: transform.interpolate((t: any) => `${t} rotateX(180deg)`) }}
                index={index}
                windowWidth={windowWidth}
                flipped={flipped}
                cardsPerRow={cardsPerRow}
            >
                <InfoHolder>
                    <CardTitle>{movie.original_title}</CardTitle>
                    <CardDate>{movie.release_date}</CardDate>
                    <CardOverview>{movie.overview}</CardOverview>
                </InfoHolder>
            </CardBack>
        </CardHolder>
    );
};

export default Card;
