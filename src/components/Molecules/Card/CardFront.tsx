import React, { Fragment } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { InterpolationChain, OpaqueInterpolation } from 'react-spring';

interface CardFrontProps {
    poster: string;
    index: number;
    windowWidth: number;
    cardsPerRow: number;
    opacity: OpaqueInterpolation<string | number | undefined>;
    transform: {
        interpolate: InterpolationChain<string | undefined>;
        getValue: () => string | undefined;
    } & string;
}

const Style = styled(Card)`
    background-image: ${({ poster }) => `url(${poster})`};
`;

const CardFront: React.FC<CardFrontProps> = ({ poster, index, windowWidth, cardsPerRow, opacity, transform }) => {
    return (
        <Fragment>
            {poster && (
                <Style
                    style={{
                        opacity: opacity.interpolate((o: any) => 1 - o),
                        transform,
                    }}
                    poster={poster}
                    index={index}
                    windowWidth={windowWidth}
                    cardsPerRow={cardsPerRow}
                />
            )}
        </Fragment>
    );
};

export default CardFront;
