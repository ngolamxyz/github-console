import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Octokit } from 'octokit';


// Create Redux store with state injected by the server
const store = configureStore({
  reducer: combineReducers({
    users: userReducer
  }),
  preloadedState: window.__PRELOADED_STATE__
})

delete window.__PRELOADED_STATE__

hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>,
    </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

window.octokit = new Octokit({
  auth: window.__GITHUB_TOKEN__
})

delete window.__GITHUB_TOKEN__
