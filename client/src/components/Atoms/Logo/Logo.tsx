import styled from 'styled-components';
import React from 'react';
import { BLACK } from '../../../constants';

const Style = styled.div`
    height: max-content;
    width: auto;
    font: bold 2rem Eskell;
    color: ${BLACK};
`;

const Logo = () => {
    return <Style>EZMovies</Style>;
};

export default Logo;
