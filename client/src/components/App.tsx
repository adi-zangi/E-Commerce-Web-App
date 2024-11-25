import React from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import NavigationMenu from './NavigationMenu';
import SearchBox from './SearchBox';

function App() {
  return (
    <div className="App">
      <NavigationMenu />
      <SearchBox />
      <HomePage />
    </div>
  );
}

export default App;
