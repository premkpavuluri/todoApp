const addItemHandler = (todoDb) => (req, res) => {
  const { listId, item } = req.body;
  const id = new Date().getTime();
  const isDone = false;

  const lists = todoDb[req.session.username].lists;
  const targetList = lists.find(list => list.id === +listId);
  targetList.todos.push({ id, name: item, isDone });

  res.sendStatus(201);
};

module.exports = { addItemHandler };
