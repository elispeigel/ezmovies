import React from 'react';
import styled from 'styled-components';

interface MovieDateProps {
    date: string;
}

const Style = styled.p`
    color: white;
    font-size: 20px;
    font-family: Fakt;
`;

const MovieDate: React.FC<MovieDateProps> = ({ date }) => {
    return <Style>{date}</Style>;
};

export default MovieDate;
