const express = require('express');

const { authenticate } = require('../handlers/authenticate.js');
const { serveList } = require('../handlers/serveList.js');

const searchHandler = (db) => (req, res) => {
  const { category, key } = req.query;
  const lists = db[req.session.username].lists;
  let filtered;

  if (category === 'list') {
    filtered = lists.filter(list => list.title.includes(key));
  }

  if (category === 'item') {
    const allTodos = lists.flatMap(list => list.todos);
    filtered = allTodos.filter(todo => todo.name === key);
  }

  res.json(JSON.stringify(filtered));
};

const createTodoApi = (db) => {
  const todoApi = express.Router();

  todoApi.use(authenticate);
  todoApi.get('/list/:id', serveList(db));

  todoApi.get('/search', searchHandler(db));

  return todoApi;
};

module.exports = { createTodoApi };
