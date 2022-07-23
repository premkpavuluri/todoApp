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

const generateHtml = ([tagName, attributes, ...content]) => {
  const element = document.createElement(tagName);
  addAttributes(element, attributes);

  content.forEach(innerElement => {
    element.append(Array.isArray(innerElement) ? generateHtml(innerElement) : innerElement);
  });

  return element;
};

const generateList = ({ id, title }) => {
  const li = document.createElement('li');
  const aTag = document.createElement('a');
  const deleteButton = document.createElement('input');

  aTag.href = `/todo/list/${id}`;
  aTag.className = 'list';
  aTag.innerText = title;

  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.onclick = deleteList;

  li.id = id;
  li.appendChild(aTag);
  li.appendChild(deleteButton);

  return li;
};

const renderLists = (lists) => {
  const ul = document.createElement('ul');
  ul.className = 'list';

  lists.forEach(list => {
    const li = generateList(list);
    ul.appendChild(generateList(list));
  });

  const listElement = document.querySelector('.all-lists');
  listElement.replaceChild(ul, listElement.firstChild);
};

const updateLists = () => {
  const request = { method: 'GET', url: '/todo/lists' };

  xhrRequest(request, 200, (xhr) => renderLists(JSON.parse(xhr.responseText)));
};

const getFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  form.reset();

  return new URLSearchParams(formData);
};

const deleteItemFeilds = () => {
  const feildContainer = document.querySelector('.feild-container');

  while (feildContainer.childElementCount) {
    feildContainer.removeChild(feildContainer.firstChild);
  }
};

const sendList = (event) => {
  const listInfo = getFormData();

  deleteItemFeilds();
  event.preventDefault();

  const request = { method: 'POST', url: '/todo/add-list' };
  xhrRequest(request, 201, updateLists, listInfo);
};

const deleteList = () => {
  const listId = event.target.parentElement.id;
  const request = {
    method: 'POST', url: `/todo/delete-list?id=${listId}`
  };

  xhrRequest(request, 201, updateLists);
};

const deleteItem = () => {
  event.target.parentElement.remove();
};

const addItemFeild = () => {
  const itemsFeild = document.querySelector('.items');
  const itemContainer = document.createElement('div');
  const newItemFeild = document.createElement('input');
  const deleteItemBtn = document.createElement('input');

  newItemFeild.type = 'text';
  newItemFeild.name = 'item';

  deleteItemBtn.type = 'button';
  deleteItemBtn.value = 'Delete';
  deleteItemBtn.onclick = deleteItem;

  itemContainer.className = 'feild-container';

  itemContainer.appendChild(newItemFeild);
  itemContainer.appendChild(deleteItemBtn);
  itemsFeild.appendChild(itemContainer);
};

const main = () => {
  updateLists();

  document.querySelector('form').addEventListener('submit', sendList);

  const createItemBtn = document.querySelector('#create-item');
  createItemBtn.onclick = addItemFeild;
};

window.onload = main;
