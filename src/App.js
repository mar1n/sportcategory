import React from 'react';
import Football from './football.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="sport">
        <h1>Football</h1>
        <img src={Football} alt="Football" />
      </div>
    </div>
  );
}

export default App;
