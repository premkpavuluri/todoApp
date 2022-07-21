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

const generateItem = ({ id, name, isDone }) => {
  const itemContainer = document.createElement('div');
  const checkbox = document.createElement('input');
  const lable = document.createElement('lable');
  const deleteBtn = document.createElement('input');

  lable.innerText = name;
  itemContainer.id = id;

  checkbox.type = 'checkbox';
  checkbox.name = 'item';
  checkbox.checked = isDone;

  deleteBtn.type = 'button';
  deleteBtn.value = 'delete';
  deleteBtn.className = 'delele-item';
  deleteBtn.onclick = deleteItem;

  itemContainer.appendChild(checkbox);
  itemContainer.appendChild(lable);
  itemContainer.appendChild(deleteBtn);

  return itemContainer;
};

const renderItems = (lists) => {
  const items = JSON.parse(lists).todos;
  const itemsContainer = document.createElement('div');

  items.forEach(item => {
    itemsContainer.appendChild(generateItem(item));
  });

  const listsBox = document.querySelector('.items');
  listsBox.replaceChild(itemsContainer, listsBox.firstChild);
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
