import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../Molecules/SearchBar/SearchBar';
import { preQueryUrl, postQueryUrl, holderUrl, WIDTH, GAP } from '../../constants';
import CardsContainer from '../Organisms/CardsContainer';
import { useDataApi } from '../../hooks/useDataApi';
import { useWindowSize } from '../../hooks/useWindowSize';
import { SearchMovie, Window } from '../../types';

interface GridContainerProps {
    cardsPerRow?: number;
}

const Style = styled.div`
    display: grid;
    grid-template-rows: max-content auto;
    grid-row-gap: ${GAP}px;
`;

const Search: React.FC<GridContainerProps> = () => {
    const [query, setQuery] = useState('');
    // const [ids, setIds] = useState<number[]>([]);
    // const [movies, setMovies] = useState<SearchMovie[]>([])
    const [
        { data: dataSearch, isLoading: isLoadingSearch, isError: isErrorSearch },
        doFetchSearch,
    ] = useDataApi(holderUrl, { hits: [] });
    const windowSize: Window = useWindowSize();
    const windowWidth: number = windowSize.width ?? 0;
    const cardsPerRow: number = Math.floor(windowWidth / (WIDTH + GAP)) ?? 0;

    // const [{data: dataMovie, isLoading: isLoadingMovie, isError: isErrorMovie}, doFetchMovie] = useDataApi(
    //   holderUrl,
    //   { hits: []}
    // )

    // useEffect(() => {

    //   if (searchResults && !!searchResults.length)
    //   searchResults.forEach((result: SearchMovie) => {
    //     setIds([...ids, result.id])
    //   });

    //   ids.forEach((id: number) => {
    //     doFetchMovie(
    //       `${preFindUrl}${id}${postFindUrl}`,
    //       { hits: [] }
    //     )
    //     setMovies([...movies, ...dataMovie.hits])
    //   })

    //   const movieResults: I

    //   console.log(resultsOrHits, 'resultsOrHits')

    // })

    const searchResults: SearchMovie[] = dataSearch?.results;

    const resultsOrHits: any = searchResults ? searchResults : dataSearch.hits;

    return (
        <Style>
            <SearchBar
                submitHandler={(event: React.FormEvent<HTMLFormElement>) => {
                    doFetchSearch(`${preQueryUrl}${query}${postQueryUrl}`, { hits: [] });
                    event.preventDefault();
                }}
                changeHandler={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                value={query}
            />
            {isErrorSearch && <div>Something went wrong ...</div>}
            {isLoadingSearch ? (
                <div>Loading ...</div>
            ) : (
                <CardsContainer cardsPerRow={cardsPerRow} movies={resultsOrHits} windowWidth={windowWidth} />
            )}
        </Style>
    );
};

export default Search;
