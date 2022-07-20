const serveLists = (todos) => (req, res, next) => {
  const userTodos = todos[req.session.username];

  res.json(userTodos.lists);
};
exports.serveLists = serveLists;
