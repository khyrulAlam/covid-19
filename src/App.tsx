import React from 'react';
import './App.scss';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Header from './components/Header';
import Contents from './components/Contents';

function App() {
  return (
    <div className="App">
      <Header />
      <Contents />
    </div>
  );
}

export default App;
