const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const { loginPageHandler } = require('./handlers/loginPage.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { signUpPage, registerUser } = require('./handlers/signUpHandler.js');
const { persistData } = require('./handlers/persistData.js');

const { createTodoApi } = require('./api/todoApi.js');
const { createTodoRouter } = require('./routers/todoRouter.js');

const createApp = (appConfig, users, todosDB) => {
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

  app.get('/sign-up', signUpPage(appConfig.templates));
  app.post('/sign-up',
    registerUser(users, todosDB), persistData(todosDB, users, appConfig));

  //Router for TODO
  const todoRouter = createTodoRouter(appConfig, users, todosDB);

  //TODO Api
  const todoApi = createTodoApi(todosDB);

  app.use('/todo', todoRouter);
  app.use('/api', todoApi);
  app.get('/logout', logoutHandler);

  return app;
};

module.exports = { createApp };
