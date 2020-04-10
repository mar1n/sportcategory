import React from 'react';
import Football from './football.jpg';
import Basketball from './basketball.jpg';
import Icehockey from './icehockey.jpg';
import Tennis from './tennis.jpg';
import Rugby from './rugby.jpg';
import Vollyball from './vollyball.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="sport">
        <h1>Football</h1>
        <img src={Football} alt="Football" />
      </div>
      <div className="sport">
        <h1>Basketball</h1>
        <img src={Basketball} alt="Basketball" />
      </div>
      <div className="sport">
        <h1>Ice hockey</h1>
        <img src={Icehockey} alt="Icehockey" />
      </div>
      <div className="sport">
        <h1>Tennis</h1>
        <img src={Tennis} alt="Tennis" />
      </div>
      <div className="sport">
        <h1>Rugby</h1>
        <img src={Rugby} alt="Rugby" />
      </div>
      <div className="sport">
        <h1>Vollyball</h1>
        <img src={Vollyball} alt="Vollyball" />
      </div>
    </div>
  );
}

export default App;
