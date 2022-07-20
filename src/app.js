const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const { loginPageHandler } = require('./handlers/loginPage.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { authenticate } = require('./handlers/authenticate.js');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');

const createApp = (appConfig, users) => {
  const app = express();

  if (process.env.ENV === 'PRODUCTION') {
    app.use(morgan('dev'));
  }

  app.use(cookieSession({
    name: process.env.SESSION_NAME,
    keys: [process.env.SESSION_KEY]
  }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(appConfig.root));

  app.get('/login', loginPageHandler(appConfig.templates));
  app.post('/login', loginHandler(users));

  app.get('/todo/home', authenticate, serveHomePage(appConfig.templates));

  app.get('/logout', logoutHandler);

  return app;
};

module.exports = { createApp };
