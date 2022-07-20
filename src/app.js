const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const { loginPageHandler } = require('./handlers/loginPage.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { authenticate } = require('./handlers/authenticate.js');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { serveLists } = require('./handlers/serveLists.js');

const createApp = (appConfig, users, todos) => {
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

  //Router for TODO
  const todoRouter = express.Router();
  todoRouter.use(authenticate);
  todoRouter.get('/home', serveHomePage(appConfig.templates));
  todoRouter.get('/lists', serveLists(todos));

  app.use('/todo', todoRouter);
  app.get('/logout', logoutHandler);

  return app;
};

module.exports = { createApp };
