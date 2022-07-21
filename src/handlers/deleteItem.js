const deleteItem = (todoDb) => (req, res) => {
  const { id, listId } = req.body;
  const { username } = req.session;

  const list = todoDb[username].lists.find(list => list.id === +listId);

  list.todos = list.todos.filter(todo => todo.id !== +id);

  res.sendStatus(201);
};
exports.deleteItem = deleteItem;
