import React from 'react';
import '../styles/App.css';
import HomePage from './HomePage';
import NavigationMenu from './NavigationMenu';

function App() {
  return (
    <div className="App">
      <NavigationMenu />
      <HomePage />
    </div>
  );
}

export default App;
