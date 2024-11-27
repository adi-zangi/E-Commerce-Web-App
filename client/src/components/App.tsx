import { FC, useState } from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import NavigationMenu from './NavigationMenu';
import SearchBox from './SearchBox';
import { AppState, Page } from '../utills/DataTypes';

const App: FC = () => {

   const [state,setState] = useState<AppState>({
      page: Page.Home,
   });
   
   return (
      <div className="App">
         { state.page === Page.Home &&
            <NavigationMenu state={state} setState={setState} /> }
         { state.page === Page.Home &&
            <SearchBox state={state} setState={setState} /> }
         { state.page === Page.Home &&
            <HomePage state={state} setState={setState} /> }
      </div>
   );
}

export default App;
