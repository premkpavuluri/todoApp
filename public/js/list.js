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

  return new URLSearchParams(formData);
};

const deleteItem = () => {
  const listId = getFormData().get('listId');
  console.log(listId);
  const request = { method: 'POST', url: '/todo/delete-item' };
  const id = event.target.parentElement.id;
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

const generateCheckBox = (name, check) => {
  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.name = name;
  checkbox.checked = check;

  return checkbox;
};

const generateLable = (innerText) => {
  const lable = document.createElement('label');

  lable.innerText = innerText;

  return lable;
};

const generateButton = (id, className, value) => {
  const button = document.createElement('input');

  button.type = 'button';
  button.id = id;
  button.className = className;
  button.value = value;

  return button;
};

const generateItem = ({ id, name, isDone }) => {
  const itemContainer = document.createElement('div');
  const checkbox = generateCheckBox('item', isDone);
  const lable = generateLable(name);
  const deleteBtn = generateButton('', 'delete-item', 'delete');

  checkbox.onclick = sendItemStatus;

  deleteBtn.onclick = deleteItem;

  itemContainer.id = id;
  itemContainer.appendChild(checkbox);
  itemContainer.appendChild(lable);
  itemContainer.appendChild(deleteBtn);

  return itemContainer;
};

const renderItems = (lists) => {
  const items = JSON.parse(lists).todos;
  const itemsList = document.createElement('div');

  items.forEach(item => {
    itemsList.appendChild(generateItem(item));
  });

  const itemsContainer = document.querySelector('.items');
  itemsContainer.replaceChild(itemsList, itemsContainer.firstChild);
};

const updateItems = (xhr) => {
  const listId = getFormData().get('listId');
  const request = { method: 'GET', url: `/api/list/${listId}` };

  xhrRequest(request, 200, (xhr) => renderItems(xhr.responseText));
};

const sendItem = () => {
  const itemInfo = getFormData();
  const req = { method: 'POST', url: '/todo/add-item' };

  xhrRequest(req, 201, updateItems, itemInfo);
};

const main = () => {
  updateItems();

  const createItemBtn = document.getElementById('create-button');
  createItemBtn.onclick = sendItem;
};

window.onload = main;
