import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { SearchMovie } from '../types';

interface StyleCardProps {
    poster?: string;
    index?: number;
    windowWidth?: number;
}

interface CardProps {
    movie: SearchMovie;
    index: number;
    windowWidth: number;
}

const WIDTH = 300;
const HEIGHT: number = WIDTH * 1.5;
const calculateLeft = (width: number, index = 0, windowWidth = 0) => {
    const calculatedIndex = index > 2 ? index % 3 : index;
    const cardsWidth = (WIDTH * 3) + 40;
    const viewPortWidthHelper = (windowWidth - cardsWidth) / 2;
    return (width * calculatedIndex) + viewPortWidthHelper;
};

const calculateTop = (height: number, index = 0) => {
    const calculatedRow = Math.floor(index / 3);
    return height * calculatedRow;
};

const CardHolder = styled.div`
    position: relative;
`;

const StyledCard = styled(animated.div)<StyleCardProps>`
    position: absolute;
    top: ${({ index }) => calculateTop(HEIGHT, index)}px;
    left: ${({ index, windowWidth }) => calculateLeft(WIDTH, index, windowWidth)}px;
    background-size: cover;
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
    will-change: transform, opacity;
`;

const CardFront = styled(StyledCard)`
    background-image: ${({ poster }) => `url(${poster})`};
`;

const CardBack = styled(StyledCard)`
    background: black;
`;

const InfoHolder = styled.div`
    padding: 30px;
`; 

const CardTitle = styled.h1`
    color: white;
    font-family: LeituraW01-DisplayItalic;
    font-size: 36px;
`;

const CardOverview = styled.p`
    color: white;
    font-family: Leitura News;
    font-size: 14px;
`;

const CardDate = styled.p`
    color: white;
    font-family: Leitura News;
`;

const Card: React.FC<CardProps> = ({ movie, index, windowWidth }) => {
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
                />
            )}
            <CardBack
                style={{ opacity, transform: transform.interpolate((t: any) => `${t} rotateX(180deg)`) }}
                index={index}
                windowWidth={windowWidth}
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
