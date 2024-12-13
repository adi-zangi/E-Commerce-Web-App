import { FC, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import NavigationMenu from './NavigationMenu';
import { AppState, Page } from '../utills/DataTypes';
import SearchResults from './SearchResults';

const App: FC = () => {
   
   const [state, setState] = useState<AppState>({
      page: Page.Home,
      searchQuery: "",
   });
   
   return (
      <div className="App">
         { state.page != undefined &&
            <NavigationMenu state={state} setState={setState} /> }
         { state.page === Page.Home &&
            <HomePage state={state} setState={setState} /> }
         { state.page === Page.SearchResults &&
            <SearchResults state={state} setState={setState} /> }
      </div>
   );
}

export default App;
