import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/pokemons' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
