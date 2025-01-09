/**
 * The main application component
 */

import { FC, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import AppNavBar from './AppNavBar';
import { AppState, Page } from '../utils/dataTypes';
import SearchResults from './SearchResults';
import TopMenu from './TopMenu';
import LogInPage from './LogInPage';

const App: FC = () => {
   
   const [state, setState] = useState<AppState>({
      page: Page.Home,
      user: null,
      searchQuery: "",
      selectedCategory: null,
   });
   
   return (
      <div className="App">
         { state.page !== Page.LogIn &&
            <TopMenu state={state} setState={setState} /> }
         { state.page !== Page.LogIn &&
            <AppNavBar state={state} setState={setState} /> }
         { state.page === Page.Home &&
            <HomePage state={state} setState={setState} /> }
         { state.page === Page.LogIn &&
            <LogInPage state={state} setState={setState} /> }
         { state.page === Page.SearchResults &&
            <SearchResults state={state} setState={setState} /> }
      </div>
   );
}

export default App;
