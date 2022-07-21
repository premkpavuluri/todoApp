const addListHandler = (todos) => (req, res) => {
  const { title } = req.body;
  const { username } = req.session;

  todos[username].lastListId++;
  const id = todos[username].lastListId;
  const lastTodoId = "todoId-0";

  const newList = { title, id, lastTodoId, todos: [] };
  todos[username].lists.unshift(newList);

  res.sendStatus(201);
};

module.exports = { addListHandler };
