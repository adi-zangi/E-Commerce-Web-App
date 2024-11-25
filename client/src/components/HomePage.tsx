import React from 'react';
import logo from '../logos/logo.svg';
import '../styles/App.css';

class HomePage extends React.Component {
   render() {
      return (
      <div>
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
         </header>
      </div>
      );
   }
}

 export default HomePage;