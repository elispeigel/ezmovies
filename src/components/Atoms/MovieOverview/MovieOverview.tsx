import React from 'react';
import styled from 'styled-components';
import { WHITE } from '../../../constants';

interface MovieOverviewProps {
    overview: string;
}

const Style = styled.p`
    color: ${WHITE};
    font-family: Fakt;
    font-size: 14px;
`;

const MovieOverview: React.FC<MovieOverviewProps> = ({ overview }) => {
    return <Style>{overview}</Style>;
};

export default MovieOverview;
