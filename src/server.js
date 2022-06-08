import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { matchPath } from "react-router-dom";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/usersReducer'
import { queryExtraUserDetail, queryLikedUsers, queryUsers } from './api/initializeState';
import favoriteReducer from './reducers/favoriteReducer';
import detailReducer from './reducers/detailReducer';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import createEmotionCache from './utils/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import theme from './theme'
import getErrorPage from './ErrorPage';

const path = require('path')
const passport = require('passport');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const GitHubStrategy = require('passport-github2').Strategy;

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const routes = [
  {
    path: "/liked",
    exact: true,
    strict: true,
    initializeState : (match, req) => queryLikedUsers(match, req)
  },
  {
    path: "/users/:username",
    exact: true,
    initializeState : (match, req) => queryExtraUserDetail(match, req)
  },
  {
    path: "/users/:username/:category",
    exact: true,
    initializeState : (match, req) => queryExtraUserDetail(match, req)
  },
  {
    path: "/",
    initializeState : (match, req) => queryUsers(match, req)
  },
]

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
  assets[entrypoint].css.map(asset=>
    `<link rel="stylesheet" href="${asset}">`
  ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, ...extra) => {
  return assets[entrypoint] ? assets[entrypoint].js ?
  assets[entrypoint].js.map(asset=>
    `<script src="${asset}" ${extra.join(" ")}></script>`
  ).join('') : '' : '';
};

export const renderApp = async (req, res, next) => {
  const { accessToken, profile } = req.user;

  const promises = [];
  routes.some(route => {
    const match = matchPath(req.url, route);
    if (match) promises.push(route.initializeState(match, req));
    return match;
  });
  let preloadedState;
  try {
    [ preloadedState ] = await Promise.all(promises);
  } catch(err) {
     throw err
  }

  const store = configureStore({
    reducer: combineReducers({
      users: usersReducer,
      favorite: favoriteReducer,
      user: detailReducer
    }),
    preloadedState
  })

  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const context = {};
  const markup = renderToString(
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
            <StaticRouter context={context} location={req.url}>
              <Provider store={store}>
                <CssBaseline/>
                <App />
              </Provider>
            </StaticRouter>
        </ThemeProvider>
      </CacheProvider>
  );

  const emotionChunks = extractCriticalToChunks(markup)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)
  const finalState = store.getState();
  const html = `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Github Console</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${cssLinksFromAssets(assets, 'client')}
      ${emotionCss}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', 'defer', 'crossorigin')}
      <script>
          window.__GITHUB_TOKEN__ = "${accessToken}"
          window.__LOGIN_USER__ = ${JSON.stringify(profile).replace(
            /</g,
            '\\u003c'
          )}
          window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(
            /</g,
            '\\u003c'
          )}
      </script>
  </body>
</html>`
  return {context, html};
}

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, { accessToken, profile });
    });
  }
));

server.use(passport.initialize());
server.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: '/var/db' })
}));
server.use(passport.authenticate('session'));

server.get('/', ensureAuthenticated)

server.get('/auth/github', function(req, res, next) {
    const authenticator = passport.authenticate('github', { scope: [ 'user:email', 'user:follow' ], state : req.query.redirect_uri });
    authenticator(req, res, next)
  });

server.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    const url = req.query.state;
    res.redirect(url);
  });

server.get('/*', ensureAuthenticated, async (req, res, next) => {
    try {
      const { context, html} = await renderApp(req, res, next);
      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(html);
      }
    } catch(err) {
      return next(err)
    }
  });

server.use((err, req, res, next) => {
  res.status(500).send(getErrorPage(err.message));
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect(`/auth/github?redirect_uri=${req.url}`)
}

export default server;
