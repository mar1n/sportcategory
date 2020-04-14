import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SportCategory from './SportCategory';
import Details from './Details/Details';
import NotFound from './NotFound';

function App() {
  return (
    <Router>

      <div className='App'>
        <Switch>
          <Route exact path='/' component={SportCategory} />
          <Route exact path='/NotFound' component={NotFound} />
          <Route exact path='/:sportId' component={Details} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
