import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.scss';
import Favorite from './components/Favorite';
import UserDetail from './components/UserDetail'



const App = () => (
  <Switch>
    <Route exact={true} path="/">
      <Home/>
    </Route>
    <Route exact={true} path="/liked">
      <Favorite/>
    </Route>
    <Route path="/users/:username">
      <UserDetail/>
    </Route>
  </Switch>
);

export default App;
