const addListHandler = (todoDb) => (req, res, next) => {
  const { title } = req.body;
  const { username } = req.session;

  todoDb[username].lastListId = ++todoDb[username].lastListId || 1;
  const id = todoDb[username].lastListId;

  const newList = { title, id, todos: [] };
  todoDb[username].lists.unshift(newList);

  res.sendStatus(201);
  next();
};

module.exports = { addListHandler };
