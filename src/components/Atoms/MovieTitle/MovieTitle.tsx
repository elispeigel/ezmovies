import React from 'react';
import styled from 'styled-components';
import { WHITE } from '../../../constants';

interface MovieTitleProps {
    title: string;
}

const Style = styled.h1`
    color: ${WHITE};
    font-family: Eskell;
    font-size: 36px;
`;

const MovieTitle: React.FC<MovieTitleProps> = ({ title }) => {
    return <Style>{title}</Style>;
};

export default MovieTitle;
