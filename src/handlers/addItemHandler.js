const addItemHandler = (todoDb) => (req, res, next) => {
  let { listId, item } = req.body;
  const id = new Date().getTime();
  const isDone = false;

  item = item ? item : 'Untitled todo';

  const lists = todoDb[req.session.username].lists;
  const targetList = lists.find(list => list.id === +listId);
  targetList.todos.push({ id, name: item, isDone });

  res.sendStatus(201);
  next();
};

module.exports = { addItemHandler };
