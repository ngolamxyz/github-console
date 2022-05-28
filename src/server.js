import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import qs from 'qs';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fetchUsers } from './api/users';
import usersReducer from './reducers/usersReducer'
let passport = require('passport');
let session = require('express-session');
let GitHubStrategy = require('passport-github2').Strategy;

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

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

export const renderApp = async (req, res) => {
  const params = qs.parse(req.query);
  const searchQuery = params.q || ""
  let apiResult = {
    userCount: 0,
    items: [],
    search_query: searchQuery
  }

  if (searchQuery) {
    apiResult = await fetchUsers(searchQuery, req.user)
  }
  const context = {};
  context.session = req.session

  const preloadedState = { users: { ...apiResult, search_query: searchQuery } }

  const store = configureStore({
    reducer: combineReducers({
      users: usersReducer
    }),
    preloadedState: preloadedState
  })

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
  const finalState = store.getState();
  const html = `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${cssLinksFromAssets(assets, 'client')}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', 'defer', 'crossorigin')}
      <script>
          window.__GITHUB_TOKEN__ = "${req.user}"
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
    scope: ['read:org', 'user:email']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, accessToken);
    });
  }
));

server.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
server.use(passport.initialize());
server.use(passport.session());

server.get('/', ensureAuthenticated)

server.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
  });

server.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

server.get('/*', ensureAuthenticated, async (req, res) => {
    const { context, html} = await renderApp(req, res);
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(html);
    }
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/github')
}

export default server;
