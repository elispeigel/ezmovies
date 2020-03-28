import React from 'react';
import styled from 'styled-components';
import { GAP } from '../../constants';
import { SearchMovie } from '../../types';
import CardWrapper from '../Molecules/Card/CardWrapper';

interface CardsContainerProps {
    cardsPerRow: number;
    movies: SearchMovie[];
    windowWidth: number;
}

interface CardsContainerStyleProps {
    cardsPerRow?: number;
}

const Style = styled.div<CardsContainerStyleProps>`
display: grid;
grid-template-columns: repeat(${({ cardsPerRow }) => cardsPerRow}, max-content)};
grid-column-gap: ${GAP}px;
grid-row-gap: ${GAP}px;
`;

const CardsContainer: React.FC<CardsContainerProps> = ({ cardsPerRow, movies, windowWidth }) => {
    return (
        <Style cardsPerRow={cardsPerRow}>
            {movies.map((movie: SearchMovie, index: number) => {
                return (
                    <CardWrapper
                        movie={movie}
                        index={index}
                        key={index}
                        windowWidth={windowWidth}
                        cardsPerRow={cardsPerRow}
                    />
                );
            })}
        </Style>
    );
};

export default CardsContainer;
