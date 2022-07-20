const serveLists = (todos) => (req, res, next) => {
  const userTodos = todos[req.session.username];

  res.json(userTodos.lists);
};

module.exports = { serveLists };
