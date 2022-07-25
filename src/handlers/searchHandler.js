const searchHandler = (db) => (req, res) => {
  const { category, key } = req.query;
  const lists = db[req.session.username].lists;
  let filtered = [];

  if (category === 'list') {
    filtered = lists.filter(list => list.title.includes(key));
  }

  if (category === 'item') {
    const allLists = lists.flatMap(list => list);
    allLists.forEach(({ id, title, todos }) => {
      const matchedTodos = todos.filter(todo => todo.name.includes(key));
      if (matchedTodos.length > 0) {
        filtered.push({ id, title, todos: matchedTodos });
      }
    });
  }

  res.json(JSON.stringify(filtered));
};

module.exports = { searchHandler };
