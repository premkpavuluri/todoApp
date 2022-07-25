const express = require('express');

const { authenticate } = require('../handlers/authenticate.js');
const { serveList } = require('../handlers/serveList.js');
const { searchHandler } = require('../handlers/searchHandler.js');

const createTodoApi = (db) => {
  const todoApi = express.Router();

  todoApi.use(authenticate);
  todoApi.get('/list/:id', serveList(db));

  todoApi.get('/search', searchHandler(db));

  return todoApi;
};

module.exports = { createTodoApi };
