const showSearchOptions = () => {
  const options = document.getElementById('search-options');

  options.style.visibility = 'visible';
};

const searchFormData = () => {
  const form = document.getElementById('search');
  const formData = new FormData(form);

  return new URLSearchParams(formData);
};

const updateViewHeader = (message) => {
  const header = document.getElementById('view-title');
  header.innerText = message
};

const searchList = (lists, key) => {
  return lists.filter(list => list.title.toLowerCase().includes(key));
};

const searchItems = (lists, key) => {
  const searchResult = [];

  lists.forEach(({ id, title, todos }) => {
    const matchedTodos = todos.filter(todo =>
      todo.name.toLowerCase().includes(key));

    if (matchedTodos.length > 0) {
      searchResult.push({ id, title, todos: matchedTodos });
    }
  });

  return searchResult;
};

const generateItems = (todos) => {
  const ul = document.createElement('ul');
  ul.className = 'items-section';

  todos.forEach(({ id, name }) => {
    const li = document.createElement('li');
    li.id = id;
    li.innerText = name;
    ul.appendChild(li);
  });

  return ul;
};

const generateListAndItems = ({ id, title, todos }) => {
  const li = document.createElement('li');
  const aTag = document.createElement('a');
  const deleteButton = document.createElement('input');
  const editButton = document.createElement('input');
  const optionsContainer = document.createElement('div');
  const listSection = document.createElement('div');

  aTag.innerText = title;
  aTag.className = 'item-name';
  aTag.href = `/todo/list/${id}`;

  editButton.type = 'button';
  editButton.value = 'Edit';
  editButton.onclick = () => makeListEditable(id);

  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.onclick = () => deleteList(id);

  optionsContainer.className = 'options';
  optionsContainer.appendChild(editButton);
  optionsContainer.appendChild(deleteButton);

  listSection.className = 'list-section';
  listSection.appendChild(aTag);
  listSection.appendChild(optionsContainer);

  li.id = id;
  li.classList.add('list', 'full-list');
  li.appendChild(listSection);
  li.appendChild(generateItems(todos));

  return li;
};

const renderListAndItems = (lists) => {
  const ul = document.createElement('ul');
  ul.className = 'lists';

  lists.forEach(list => {
    ul.appendChild(generateListAndItems(list));
  });

  const listElement = document.querySelector('.all-lists');
  listElement.firstChild.replaceWith(ul);
};

const filterByCompletion = (lists, key, status) => {
  const searchResult = [];

  lists.forEach(({ id, title, todos }) => {
    const matchedTodos = todos.filter(({ name, isDone }) => {
      console.log(name, isDone, '==', status);
      return name.toLowerCase().includes(key) && isDone === status;
    });

    if (matchedTodos.length > 0) {
      searchResult.push({ id, title, todos: matchedTodos });
    }
  });

  return searchResult;
};

const performSearch = (query, todoData) => {
  const key = query.get('key').toLowerCase();
  const category = query.get('category');
  let filtered = [];

  if (category === 'list') {
    filtered = searchList(todoData, key);
    updateViewHeader('Search results');
    return renderLists(filtered);
  }

  if (category === 'items') {
    filtered = searchItems(todoData, key);
  }

  if (category === 'done') {
    filtered = filterByCompletion(todoData, key, true);
  }

  if (category === 'pending') {
    filtered = filterByCompletion(todoData, key, false);
  }

  updateViewHeader('Search results');
  renderListAndItems(filtered);
};

const search = () => {
  event.preventDefault();
  const formData = searchFormData();
  const req = { method: 'GET', url: '/todo/lists' };

  xhrRequest(req, 200, (xhr) =>
    performSearch(formData, JSON.parse(xhr.response)));
};