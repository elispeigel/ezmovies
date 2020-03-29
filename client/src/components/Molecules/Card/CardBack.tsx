import React from 'react';
import styled from 'styled-components';
import { InterpolationChain, OpaqueInterpolation } from 'react-spring';
import { BLACK } from '../../../constants';
import Card from './Card';
import MovieInfo from '../MovieInfo/MovieInfo';

interface CardBackProps {
    title: string;
    date: string;
    overview: string;
    index: number;
    windowWidth: number;
    flipped: boolean;
    cardsPerRow: number;
    opacity: OpaqueInterpolation<string | number | undefined>;
    transform: {
        interpolate: InterpolationChain<string | undefined>;
        getValue: () => string | undefined;
    } & string;
}

const Style = styled(Card)`
    background: ${BLACK};
    overflow-y: auto;
`;

const CardBack: React.FC<CardBackProps> = ({
    index,
    windowWidth,
    flipped,
    cardsPerRow,
    title,
    date,
    overview,
    opacity,
    transform,
}) => {
    return (
        <Style
            style={{
                opacity,
                transform: transform.interpolate((t: any) => `${t} rotateX(180deg)`),
            }}
            index={index}
            windowWidth={windowWidth}
            flipped={flipped}
            cardsPerRow={cardsPerRow}
        >
            <MovieInfo title={title} date={date} overview={overview} />
        </Style>
    );
};

export default CardBack;
