const { generateHtml } = require('../utils/generateHtml.js');

const generateItem = ({ id, name, isDone }) => {
  const tick = isDone ? 'checked' : 'unchecked';
  const dom = ['div', [['id', id]],
    ['input', [['type', 'checkbox'], ['name', 'item'], [tick, '']]],
    ['label', [['for', 'item']], name]
  ];

  return generateHtml(dom);
};

const generateItems = (items) => {
  return items.map(generateItem).join('');
};

const generateListPage = (username, userLists, template) => {
  const { id, title, todos } = userLists;
  let page = template.replace('__USERNAME__', username);
  page = template.replace('__LISTID__', id);
  page = page.replace('__TITLE__', title);
  page = page.replace('__ITEMS__', generateItems(todos));

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
