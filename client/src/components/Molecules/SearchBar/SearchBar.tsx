import React from 'react';
import styled from 'styled-components';
import SearchInput from '../../Atoms/SearchInput/SearchInput';
import Button from '../../Atoms/Button/Button';
import Logo from '../../Atoms/Logo/Logo';

interface SearchBarProps {
    value: string;
    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void;
    submitHandler(event: React.FormEvent<HTMLFormElement>): void;
}

const Style = styled.form`
    height: max-content;
    margin: 10px;
    display: grid;
    grid-template-columns: max-content max-content 7vw;
    grid-column-gap: 10px;
`;

const SearchBar: React.FC<SearchBarProps> = ({ value, changeHandler, submitHandler }) => {
    return (
        <Style onSubmit={submitHandler}>
            <Logo/>
            <SearchInput type="text" value={value} changeHandler={changeHandler} />
            <Button title="Search" type="submit" />
        </Style>
    );
};

export default SearchBar;
