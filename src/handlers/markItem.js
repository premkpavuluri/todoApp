const markItem = (todoDb) => (req, res) => {
  const { listId, id, check } = req.body;
  const { username } = req.session;

  const list = todoDb[username].lists.find(list => list.id === +listId);
  const todo = list.todos.find(todo => todo.id === +id);
  todo.isDone = check === 'true';

  res.sendStatus(201);
};
exports.markItem = markItem;
