const serveList = (todosDb) => (req, res) => {
  const { id } = req.params;
  const { username } = req.session;

  const lists = todosDb[username].lists;
  const requestList = lists.find(list => list.id === +id);

  res.json(requestList);
};

module.exports = { serveList };
