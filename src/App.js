import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SportCategory from './SportCategory';
import Details from './Details';
function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={SportCategory} />
        <Route exact path='/:details' component={Details} />
      </div>
    </Router>
  );
}

export default App;
