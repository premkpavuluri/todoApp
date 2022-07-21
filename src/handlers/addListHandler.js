const generateTodos = (items) => {
  const allItems = items['item'];

  if (!allItems) {
    return [];
  };

  const listItems = Array.isArray(allItems) ? allItems : [allItems];

  return listItems.map((name, index) => {
    return { id: index + 1, name, isDone: false }
  });
};

const addListHandler = (todoDb) => (req, res) => {
  const { title, ...items } = req.body;
  const { username } = req.session;

  todoDb[username].lastListId++;
  const id = todoDb[username].lastListId;

  const newTodos = generateTodos(items);
  const lastTodoId = newTodos.length;

  const newList = { title, id, lastTodoId, todos: newTodos };
  todoDb[username].lists.unshift(newList);

  res.sendStatus(201);
};

module.exports = { addListHandler };
