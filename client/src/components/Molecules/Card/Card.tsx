import { InterpolationChain, OpaqueInterpolation, animated } from 'react-spring';
import styled from 'styled-components';
import { GAP, HEIGHT, WIDTH, BLACK } from '../../../constants';

interface CardStyleProps {
    poster?: string;
    index?: number;
    windowWidth?: number;
    flipped?: boolean;
    cardsPerRow?: number;
    opacity?: OpaqueInterpolation<string | number | undefined>;
    transform?: {
        interpolate: InterpolationChain<string | undefined>;
        getValue: () => string | undefined;
    } & string;
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

const Card = styled(animated.div)<CardStyleProps>`
    position: absolute;
    top: ${({ index, cardsPerRow }) => calculateTop(HEIGHT, index, cardsPerRow)}px;
    left: ${({ index, windowWidth, cardsPerRow }) => calculateLeft(WIDTH, index, windowWidth, cardsPerRow)}px;
    background-size: cover;
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
    will-change: transform, opacity;
    cursor: ${({ flipped }) => (flipped ? `auto` : `default`)};
    box-shadow: 3px 3px 3px ${BLACK};
`;

export default Card;
