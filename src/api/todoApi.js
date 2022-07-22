const express = require('express');

const { authenticate } = require('../handlers/authenticate.js');
const { serveList } = require('../handlers/serveList.js');

const createTodoApi = (db) => {
  const todoApi = express.Router();

  todoApi.use(authenticate);
  todoApi.get('/list/:id', serveList(db));

  return todoApi;
};

module.exports = { createTodoApi };
