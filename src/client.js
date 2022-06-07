import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
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
import errorReducer from './reducers/errorsHandler';
import { rtkQueryErrorLogger } from "./reducers/rtkQueryErrorLogger";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Message from './components/Message';
import { ColorModeContext } from './ColorModeContext';

const cache = createEmotionCache()

// Create Redux store with state injected by the server
const store = configureStore({
  reducer: combineReducers({
    users: usersReducer,
    favorite: favoriteReducer,
    user: detailReducer,
    error: errorReducer,
  }),
  preloadedState: window.__PRELOADED_STATE__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger)
})

const token = window.__GITHUB_TOKEN__
const graphql = setUpGraphql(token)
window.graphql = graphql
window.profile = window.__LOGIN_USER__


function Main() {
  const initialMode = localStorage.getItem('mode') || 'light'
  const [mode, setMode] = useState(initialMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        localStorage.setItem('mode', localStorage.getItem('mode') === 'light' ? 'dark' : 'light')
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  useEffect(() => {
    // TODO will be fixed if saving theme mode on server.
    setTimeout(() => {
      colorMode.toggleColorMode()
      colorMode.toggleColorMode()
    }, 0)
  }, [])
  return (
      <BrowserRouter>
        <Provider store={store}>
          <ApolloProvider client={graphql}>
            <CacheProvider value={cache}>
              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline/>
                  <Message/>
                  <App />
                </ThemeProvider>
              </ColorModeContext.Provider>
          </CacheProvider>
          </ApolloProvider>
        </Provider>
      </BrowserRouter>
  )
}


hydrate(
  <Main/>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

delete window.__PRELOADED_STATE__
delete window.__GITHUB_TOKEN__