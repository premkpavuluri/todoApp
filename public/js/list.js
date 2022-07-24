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

const getFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  form.reset();

  return new URLSearchParams(formData);
};

const deleteItem = (id) => {
  const listId = getFormData().get('listId');
  const request = { method: 'POST', url: '/todo/delete-item' };
  const itemInfo = new URLSearchParams([['listId', listId], ['id', id]]);

  xhrRequest(request, 201, updateItems, itemInfo);
};

const sendItemStatus = () => {
  const { parentElement: { id }, checked } = event.target;
  const listId = getFormData().get('listId');
  const itemInfo = new URLSearchParams([
    ['listId', listId], ['id', id], ['check', checked]
  ]);
  const request = { method: 'POST', url: '/todo/mark-item' };

  xhrRequest(request, 201, updateItems, itemInfo);
};

const updateItemName = () => {
  if (event.key !== 'Enter') {
    return;
  }

  const { value, parentElement: { id } } = event.target;
  const listId = getFormData().get('listId');
  const itemInfo =
    new URLSearchParams([['listId', listId], ['id', id], ['item', value]]);
  const request = { method: 'POST', url: '/todo/edit-item' };

  xhrRequest(request, 201, updateItems, itemInfo);
};

const makeItemEditable = (id) => {
  const itemElement = document.getElementById(id).querySelector('.item-name');
  const inputFeild = document.createElement('input');

  inputFeild.className = itemElement.className;
  inputFeild.value = itemElement.innerText;
  inputFeild.onkeydown = updateItemName;

  itemElement.replaceWith(inputFeild);
  inputFeild.focus();
};

const generateItem = ({ id, name, isDone }) => {
  const itemContainer = document.createElement('div');
  const checkbox = document.createElement('input');
  const lable = document.createElement('label');
  const deleteBtn = document.createElement('input');
  const editBtn = document.createElement('input');
  const optionContainer = document.createElement('div');

  checkbox.type = 'checkbox';
  checkbox.name = 'item';
  checkbox.checked = isDone;
  checkbox.onclick = sendItemStatus;

  lable.className = 'item-name';
  lable.innerText = name;

  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-item';
  deleteBtn.value = 'Delete';
  deleteBtn.onclick = () => deleteItem(id);

  editBtn.type = 'button';
  editBtn.value = 'edit';
  editBtn.onclick = () => makeItemEditable(id);

  optionContainer.className = 'options';
  optionContainer.appendChild(editBtn);
  optionContainer.appendChild(deleteBtn);
  itemContainer.id = id;
  itemContainer.className = 'item';
  itemContainer.appendChild(checkbox);
  itemContainer.appendChild(lable);
  itemContainer.appendChild(optionContainer);

  return itemContainer;
};

const updateTitle = (title) => {
  document.querySelector('#list-title').innerText = title;
};

const renderItems = (lists) => {
  const { title, todos: items } = JSON.parse(lists);
  updateTitle(title);

  const itemsList = document.createElement('div');

  items.forEach(item => {
    itemsList.appendChild(generateItem(item));
  });

  const itemsContainer = document.querySelector('.items');
  itemsContainer.replaceChild(itemsList, itemsContainer.firstChild);
};

const updateItems = (response) => {
  const listId = getFormData().get('listId');
  const request = { method: 'GET', url: `/api/list/${listId}` };

  xhrRequest(request, 200, (xhr) => renderItems(xhr.responseText));
};

const sendItem = (event) => {
  const itemInfo = getFormData();
  event.preventDefault();

  const req = { method: 'POST', url: '/todo/add-item' };

  if (!itemInfo.get('item')) {
    return;
  }

  xhrRequest(req, 201, updateItems, itemInfo);
};

const main = () => {
  updateItems();

  document.querySelector('form').onsubmit = sendItem;
};

window.onload = main;
