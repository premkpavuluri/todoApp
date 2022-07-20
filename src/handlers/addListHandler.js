const addListHandler = (todos) => (req, res) => {
  const { title } = req.body;
  const { username } = req.session;
  todos[username].lastListId++;
  const id = todos[username].lastListId;

  const newList = { title, id, isDone: false };
  todos[username].lists.unshift(newList);

  res.sendStatus(201);
};

module.exports = { addListHandler };
