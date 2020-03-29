import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    title: string;
    type: 'button' | 'submit' | 'reset' | undefined;
}

const Style = styled.button`
    font: 1.2rem Fakt;
`;

const Button: React.FC<ButtonProps> = ({ title, type }) => {
    return <Style type={type}>{title}</Style>;
};

export default Button;
