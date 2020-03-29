import React from 'react';
import styled from 'styled-components';

interface SearchInputProps {
    type: string;
    value: string;
    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Style = styled.input`
    height: auto;
    width: 30vw;
    font: 1.2rem Fakt;
    padding: 5px;
`;

const SearchInput: React.FC<SearchInputProps> = ({ type, value, changeHandler }) => {
    return <Style type={type} value={value} onChange={changeHandler} />;
};

export default SearchInput;
