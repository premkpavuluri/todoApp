const deleteList = (todos) => (req, res, next) => {
  const { id } = req.query;
  const { username } = req.session;
  const userLists = todos[username].lists;

  const newList = userLists.filter(list => list.id !== +id);
  todos[username].lists = newList;

  res.sendStatus(201);
  next();
};

module.exports = { deleteList };
