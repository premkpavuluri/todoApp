const xhrRequest = (req, onStatus, handler, body = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === onStatus) {
      return handler(xhr);
    }
  };

  xhr.open(req.method, req.url);
  xhr.send(body);
};

const getFormData = (id) => {
  const form = document.getElementById(id);
  const formData = new FormData(form);
  form.reset();

  return new URLSearchParams(formData);
};

const updateListName = (listId) => {
  if (event.key !== 'Enter') {
    return;
  }

  const { value } = event.target;
  const listInfo = new URLSearchParams([['id', listId], ['title', value]]);

  const request = { method: 'POST', url: '/todo/edit-list' };
  xhrRequest(request, 201, updateLists, listInfo);
};

const makeListEditable = (listId) => {
  const listName = document.getElementById(listId).querySelector('.item-name');
  const inputFeild = document.createElement('input');

  inputFeild.classList = listName.className;
  inputFeild.value = listName.innerText;
  inputFeild.addEventListener('keydown', () => updateListName(listId));

  listName.replaceWith(inputFeild);
  inputFeild.focus()
};

const deleteList = (listId) => {
  const request = {
    method: 'POST', url: `/todo/delete-list?id=${listId}`
  };

  xhrRequest(request, 201, updateLists);
};

const generateList = ({ id, title }) => {
  const li = document.createElement('li');
  const aTag = document.createElement('a');
  const deleteButton = document.createElement('input');
  const editButton = document.createElement('input');
  const container = document.createElement('div');

  aTag.innerText = title;
  aTag.className = 'item-name';
  aTag.href = `/todo/list/${id}`;

  editButton.type = 'button';
  editButton.value = 'Edit';
  editButton.onclick = () => makeListEditable(id);

  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.onclick = () => deleteList(id);

  container.className = 'options';
  container.appendChild(editButton);
  container.appendChild(deleteButton);

  li.id = id;
  li.className = 'list';
  li.appendChild(aTag);
  li.appendChild(container);

  return li;
};

const renderLists = (lists) => {
  const ul = document.createElement('ul');
  ul.className = 'lists';

  lists.forEach(list => {
    ul.appendChild(generateList(list));
  });

  const listElement = document.querySelector('.all-lists');
  listElement.firstChild.replaceWith(ul);
};

const updateLists = () => {
  const request = { method: 'GET', url: '/todo/lists' };

  xhrRequest(request, 200, (xhr) => renderLists(JSON.parse(xhr.responseText)));
};

const sendList = (event) => {
  const listInfo = getFormData('create-list-form');

  event.preventDefault();

  const request = { method: 'POST', url: '/todo/add-list' };
  xhrRequest(request, 201, updateLists, listInfo);
};

const main = () => {
  updateLists();

  document.getElementById('create-list-form').onsubmit = sendList;

  document.getElementById('search-bar').onclick = showSearchOptions;

  document.getElementById('search').onsubmit = search;
  document.getElementById('search').onchange = search;
};

window.onload = main;
