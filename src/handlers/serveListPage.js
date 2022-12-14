const generateListPage = (username, { id }, template) => {
  let page = template.replace('__USERNAME__', username);
  page = page.replace('__LISTID__', id);

  return page;
};

const serveListPage = (todoDB, templates) => (req, res) => {
  const { id } = req.params;
  const { username } = req.session;
  const lists = todoDB[username].lists;
  const requestedList = lists.find(list => list.id === +id);

  const page = generateListPage(username, requestedList, templates.listPage);
  res.end(page);
};

module.exports = { serveListPage };
