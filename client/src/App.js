import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LandingPage from './Pages/LandingPage/LandingPage';
import Form from './Components/Form/Form'
import Details from './Components/Detail/Detail';
import { NavBar } from './Components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/pokemons' component={Home} />
        <Route path='/create' component={Form} />
        <Route path='/pokemons/:id' component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
