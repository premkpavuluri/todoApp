const express = require('express');

const { addItemHandler } = require('../handlers/addItemHandler.js');
const { addListHandler } = require('../handlers/addListHandler.js');
const { authenticate } = require('../handlers/authenticate.js');
const { deleteItem } = require('../handlers/deleteItem.js');
const { deleteList } = require('../handlers/deleteList.js');
const { markItem } = require('../handlers/markItem.js');
const { persistData } = require('../handlers/persistData.js');
const { serveHomePage } = require('../handlers/serveHomePage.js');
const { serveListPage } = require('../handlers/serveListPage.js');
const { serveLists } = require('../handlers/serveLists.js');
const { editListHandler, editItemHandler } =
  require('../handlers/editHandler.js');

const createTodoRouter = (config, users, db) => {
  const todoRouter = express.Router();

  todoRouter.use(authenticate);

  todoRouter.get('/home', serveHomePage(config.templates));
  todoRouter.get('/lists', serveLists(db));

  todoRouter.post('/add-list',
    addListHandler(db), persistData(db, users, config));

  todoRouter.post('/delete-list',
    deleteList(db), persistData(db, users, config));

  todoRouter.get('/list/:id', serveListPage(db, config.templates));

  todoRouter.post('/add-item',
    addItemHandler(db), persistData(db, users, config));

  todoRouter.post('/delete-item',
    deleteItem(db), persistData(db, users, config));

  todoRouter.post('/mark-item', markItem(db), persistData(db, users, config));

  todoRouter.post('/edit-list', editListHandler(db));

  todoRouter.post('/edit-item', editItemHandler(db));

  return todoRouter;
};

module.exports = { createTodoRouter };
