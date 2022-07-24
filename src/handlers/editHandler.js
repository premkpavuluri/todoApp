const editListHandler = (db) => (req, res) => {
  const { id, title } = req.body;
  const { lists } = db[req.session.username];
  const list = lists.find(list => list.id === +id);
  list.title = title;

  res.sendStatus(201);
};

const editItemHandler = (db) => (req, res) => {
  const { id, listId, item } = req.body;
  const { lists } = db[req.session.username];
  const { todos } = lists.find(list => list.id === +listId);
  todos.find(todo => todo.id === +id).name = item;

  res.sendStatus(201);
};

module.exports = { editItemHandler, editListHandler };
