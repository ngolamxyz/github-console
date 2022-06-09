import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.scss';
import Favorite from './components/Favorite';
import UserDetail from './components/UserDetail'
import { Container } from '@mui/material';

import '@fontsource/jost/100.css';
import '@fontsource/jost/200.css';
import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import '@fontsource/jost/600.css';
import '@fontsource/jost/700.css';
import '@fontsource/jost/800.css';
import '@fontsource/jost/900.css';
import PageNotFound from './components/PageNotFound';


const App = () => (
  <Container maxWidth="md" sx={{
    height: "100vh"
  }}>
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
      <Route path='*'>
        <PageNotFound/>
      </Route>
    </Switch>
  </Container>
  
);

export default App;
