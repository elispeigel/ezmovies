import React from 'react';
import styled from 'styled-components';
import MovieTitle from '../../Atoms/MovieTitle/MovieTitle';
import MovieDate from '../../Atoms/MovieDate/MovieDate';
import MovieOverview from '../../Atoms/MovieOverview/MovieOverview';

interface MovieInfoProps {
    title: string;
    date: string;
    overview: string;
}

const Style = styled.div`
    padding: 30px;
`;

const MovieInfo: React.FC<MovieInfoProps> = ({ title, date, overview }) => {
    return (
        <Style>
            <MovieTitle title={title} />
            <MovieDate date={date} />
            <MovieOverview overview={overview} />
        </Style>
    );
};

export default MovieInfo;
