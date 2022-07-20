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

const generateAttributes = (list) => {
  return list.map(([key, value]) => `${key}="${value}"`).join('');
};

const tag = (name, attributes, content) =>
  `<${name} ${generateAttributes(attributes)}>${content}</${name}>`;

const generateHtml = ([tagName, attributes, ...body]) => {
  const innerHTML = body.map(element => {
    return Array.isArray(element) ? generateHtml(element) : element;
  }).join('');

  return tag(tagName, attributes, innerHTML);
};

const generateList = ({ id, title }) => {
  const li = ['li', [['id', id]],
    title, ['input',
      [['type', 'button'], ['value', 'delete'],
      ['onclick', 'deleteList()']], ''
    ]];

  return generateHtml(li);
};

const renderLists = (lists) => {
  const htmlLists = lists.map(generateList).join('');
  const ul = generateHtml(['ul', [['class', 'list']], htmlLists]);

  const listElement = document.querySelector('.all-lists');
  listElement.innerHTML = ul;
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

const sendList = () => {
  const listInfo = getFormData();

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

const main = () => {
  updateLists();

  const createBtn = document.querySelector('#create-list');
  createBtn.onclick = sendList;
};

window.onload = main;
