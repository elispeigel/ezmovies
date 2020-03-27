import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './components/Card';
import { useDataApi } from './hooks/useDataApi';
import { useWindowSize } from './hooks/useWindowSize';
import { preQueryUrl, postQueryUrl, preFindUrl, postFindUrl, holderUrl, GAP, WIDTH } from './constants';
import { SearchMovie, Window } from './types';

// Pick up notes: use data from search for flipping card. if you click on a card it expands and you can then get more data for the individual movie.

interface GridContainerProps {
    cardsPerRow?: number;
}

const Layout = styled.div`
    display: grid;
    grid-template-rows: max-content auto;
`;

const SearchBar = styled.form`
    height: 5vh;
`;

const SearchInput = styled.input`
    height: 100%;
    width: 10vw;
`;

const GridContainer = styled.div<GridContainerProps>`
    display: grid;
    grid-template-columns: repeat(${({ cardsPerRow }) => cardsPerRow}, max-content)};
    grid-column-gap: ${GAP}px;
    grid-row-gap: ${GAP}px;
`;

const App: React.FC = () => {
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
        <Layout>
            <SearchBar
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    doFetchSearch(`${preQueryUrl}${query}${postQueryUrl}`, { hits: [] });
                    event.preventDefault();
                }}
            >
                <SearchInput type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
                <button type="submit">Search</button>
            </SearchBar>
            {isErrorSearch && <div>Something went wrong ...</div>}
            {isLoadingSearch ? (
                <div>Loading ...</div>
            ) : (
                <GridContainer cardsPerRow={cardsPerRow}>
                    {resultsOrHits.map((movie: SearchMovie, index: number) => {
                        return (
                            <Card
                                movie={movie}
                                index={index}
                                key={index}
                                windowWidth={windowWidth}
                                cardsPerRow={cardsPerRow}
                            />
                        );
                    })}
                </GridContainer>
            )}
        </Layout>
    );
};

export default App;
