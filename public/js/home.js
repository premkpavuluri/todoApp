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

const updateListName = () => {
  if (event.key !== 'Enter') {
    return;
  }

  const { value, parentElement: { id } } = event.target;
  const listInfo = new URLSearchParams([['id', id], ['title', value]]);

  const request = { method: 'POST', url: '/todo/edit-list' };
  xhrRequest(request, 201, updateLists, listInfo);
};

const makeListEditable = (listId) => {
  const listName = document.getElementById(listId).querySelector('.item-name');
  const inputFeild = document.createElement('input');

  inputFeild.classList = listName.className;
  inputFeild.value = listName.innerText;
  inputFeild.addEventListener('keydown', updateListName);

  listName.replaceWith(inputFeild);
  inputFeild.focus()
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
  editButton.value = 'edit';
  editButton.onclick = () => makeListEditable(id);

  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.onclick = () => deleteList(id);

  container.className = 'options';
  container.appendChild(editButton);
  container.appendChild(deleteButton);

  li.id = id;
  li.appendChild(aTag);
  li.appendChild(container);

  return li;
};

const renderLists = (lists) => {
  const ul = document.createElement('ul');
  ul.className = 'list';

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

const getFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  form.reset();

  return new URLSearchParams(formData);
};

const deleteItemFeilds = () => {
  const items = document.querySelector('.items');
  items.innerHTML = null;
};

const sendList = (event) => {
  const listInfo = getFormData();

  event.preventDefault();

  const request = { method: 'POST', url: '/todo/add-list' };
  xhrRequest(request, 201, updateLists, listInfo);

  deleteItemFeilds();
};

const deleteList = (listId) => {
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
  newItemFeild.required = true;

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

  document.querySelector('form').onsubmit = sendList;

  const createItemBtn = document.querySelector('#create-item');
  createItemBtn.onclick = addItemFeild;
};

window.onload = main;
