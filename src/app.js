const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const { loginPageHandler } = require('./handlers/loginPage.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { authenticate } = require('./handlers/authenticate.js');
const { serveHomePage } = require('./handlers/serveHomePage.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { serveLists } = require('./handlers/serveLists.js');
const { addListHandler } = require('./handlers/addListHandler.js');
const { deleteList } = require('./handlers/deleteList.js');
const { serveListPage } = require('./handlers/serveListPage.js');
const { addItemHandler } = require('./handlers/addItemHandler.js');
const { serveList } = require('./handlers/serveList.js');
const { deleteItem } = require('./handlers/deleteItem.js');
const { markItem } = require('./handlers/markItem.js');
const { signUpPage, registerUser } = require('./handlers/signUpHandler.js');

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
  app.post('/sign-up', registerUser(users, todosDB));

  //Router for TODO
  const todoRouter = express.Router();
  todoRouter.use(authenticate);
  todoRouter.get('/home', serveHomePage(appConfig.templates));
  todoRouter.get('/lists', serveLists(todosDB));
  todoRouter.post('/add-list', addListHandler(todosDB));
  todoRouter.post('/delete-list', deleteList(todosDB));
  todoRouter.get('/list/:id', serveListPage(todosDB, appConfig.templates));
  todoRouter.post('/add-item', addItemHandler(todosDB));
  todoRouter.post('/delete-item', deleteItem(todosDB));
  todoRouter.post('/mark-item', markItem(todosDB));

  //TODO Api
  const todoApi = express.Router();
  todoApi.use(authenticate);
  todoApi.get('/list/:id', serveList(todosDB));

  app.use('/todo', todoRouter);
  app.use('/api', todoApi);
  app.get('/logout', logoutHandler);

  return app;
};

module.exports = { createApp };
