import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux'
import usersReducer from './reducers/usersReducer'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ApolloProvider } from '@apollo/client';
import setUpGraphql from './api';

// Create Redux store with state injected by the server
const store = configureStore({
  reducer: combineReducers({
    users: usersReducer
  }),
  preloadedState: window.__PRELOADED_STATE__
})

const token = window.__GITHUB_TOKEN__
const graphql = setUpGraphql(token)
window.graphql = graphql

hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={graphql}>
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

delete window.__PRELOADED_STATE__
delete window.__GITHUB_TOKEN__