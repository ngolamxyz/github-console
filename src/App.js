import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.scss';
import Favorite from './components/Favorite';
import UserDetail from './components/UserDetail'
import { Container } from '@mui/material';



const App = () => (
  <Container maxWidth="md">
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/liked">
        <Favorite/>
      </Route>
      <Route path="/users/:username">
        <UserDetail/>
      </Route>
    </Switch>
  </Container>
  
);

export default App;
