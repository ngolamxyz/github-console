import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { ApolloProvider } from '@apollo/client';
import setUpGraphql from './api';
import usersReducer from './reducers/usersReducer'
import favoriteReducer from './reducers/favoriteReducer';
import detailReducer from './reducers/detailReducer';
import createEmotionCache from './utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from 'styled-components';
import theme from './theme'
import errorReducer, { rtkQueryErrorLogger } from './reducers/errorsHandler';
import { CssBaseline } from '@mui/material';
import Message from './components/Message';

const cache = createEmotionCache()

// Create Redux store with state injected by the server
const store = configureStore({
  reducer: combineReducers({
    users: usersReducer,
    favorite: favoriteReducer,
    user: detailReducer,
    error: errorReducer
  }),
  preloadedState: window.__PRELOADED_STATE__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger),

})

const token = window.__GITHUB_TOKEN__
const graphql = setUpGraphql(token)
window.graphql = graphql
window.profile = window.__LOGIN_USER__

hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={graphql}>
          <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <Message/>
              <App />
            </ThemeProvider>
          </CacheProvider>
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