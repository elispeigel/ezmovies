import React, { Fragment } from 'react';
import Search from '../components/Pages/Search';

// Pick up notes: use data from search for flipping card. if you click on a card it expands and you can then get more data for the individual movie.

const App: React.FC = () => {
    return (
        <Fragment>
            <Search />
        </Fragment>
    );
};

export default App;
