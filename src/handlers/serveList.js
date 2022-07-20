const serveList = (todoDB) => (req, res) => {
  const { id } = req.params;
  const lists = todoDB[req.session.username].lists;
  const requestedList = lists.find(list => list.id === +id);

  console.log(requestedList);
  res.end('loading...');
};

module.exports = { serveList };
