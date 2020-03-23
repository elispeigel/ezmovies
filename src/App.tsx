import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Card from './components/Card'
import {useDataApi} from './hooks/useDataApi'
import {preQueryUrl, postQueryUrl, preFindUrl, postFindUrl, holderUrl} from './constants'
import {ISearchMovie} from './types'

// Pick up notes: use data from search for flipping card. if you click on a card it expands and you can then get more data for the individual movie.

const Layout = styled.div`
  display: grid;
  grid-template-rows: max-content auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  position: relative;
`;


const App: React.FC = () => {

  const [query, setQuery] = useState('');
  // const [ids, setIds] = useState<number[]>([]);
  // const [movies, setMovies] = useState<ISearchMovie[]>([])
  const [{data: dataSearch, isLoading: isLoadingSearch, isError: isErrorSearch}, doFetchSearch] = useDataApi(
    holderUrl,
    { hits: []}
  )

  // const [{data: dataMovie, isLoading: isLoadingMovie, isError: isErrorMovie}, doFetchMovie] = useDataApi(
  //   holderUrl,
  //   { hits: []}
  // )

  // useEffect(() => {


  //   if (searchResults && !!searchResults.length)
  //   searchResults.forEach((result: ISearchMovie) => {
  //     setIds([...ids, result.id])
  //   });
  
  //   ids.forEach((id: number) => {
  //     doFetchMovie(
  //       `${preFindUrl}${id}${postFindUrl}`,
  //       { hits: [] }
  //     )
  //     setMovies([...movies, ...dataMovie.hits])
  //   })

  //   // const movieResults: I
  
  //   console.log(resultsOrHits, 'resultsOrHits')

  // })

  const searchResults: ISearchMovie[] = dataSearch?.results;

  const resultsOrHits: any = searchResults ? searchResults : dataSearch.hits;

  
  return (
    <Layout>
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        doFetchSearch(
          `${preQueryUrl}${query}${postQueryUrl}`,
          { hits: [] }
        )
        event.preventDefault();
      }}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isErrorSearch && <div>Something went wrong ...</div>}
      {isLoadingSearch ? (
        <div>Loading ...</div>
      ) : (
        <GridContainer>
          {resultsOrHits.map((movie: ISearchMovie, index: number) => {
              return (
                <Card
              movie={movie}
              index={index}
              key={index}
            />
              )
          })}
        </GridContainer>
      )}
    </Layout>
  );
}

export default App;
