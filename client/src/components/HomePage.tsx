/**
 * The contents of the home page of the app
 */

import { FC } from 'react';
import logo from '../logos/logo.svg';
import '../styles/App.css';
import { AppState } from '../utils/dataTypes';

interface Props {
   state: AppState;
}

const HomePage: FC<Props> = (props: Props) => {
   return (
      <div>
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
         </header>
      </div>
   );
}

 export default HomePage;