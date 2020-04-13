import React from 'react';
import Football from './images/football.jpg';
import Basketball from './images/basketball.jpg';
import Icehockey from './images/icehockey.jpg';
import Tennis from './images/tennis.jpg';
import Rugby from './images/rugby.jpg';
import Vollyball from './images/vollyball.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="sport">
        <img src={Football} alt="Football" />
        <div className="overlay">
          <h1>Football</h1>
        </div>
      </div>
      <div className="sport">
        <img src={Basketball} alt="Basketball" />
        <div className="overlay">
        <h1>Basketball</h1>
        </div>
      </div>
      <div className="sport">
        <img src={Icehockey} alt="Icehockey" />
        <div className="overlay">
          <h1>Ice hockey</h1>
        </div>
      </div>
      <div className="sport">
        <img src={Tennis} alt="Tennis" />
        <div className="overlay">
          <h1>Tennis</h1>
        </div>
      </div>
      <div className="sport">
        <img src={Rugby} alt="Rugby" />
        <div className="overlay">
          <h1>Rugby</h1>
        </div>
      </div>
      <div className="sport">
        <img src={Vollyball} alt="Vollyball" />
        <div className="overlay">
          <h1>Vollyball</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
