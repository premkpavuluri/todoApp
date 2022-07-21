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

const updateItems = (xhr) => {
  //request for items;
};

const sendItem = () => {
  const itemInfo = getFormData();
  const req = { method: 'POST', url: '/todo/add-item' };

  xhrRequest(req, 201, updateItems, itemInfo);
};

const main = () => {
  const createItemBtn = document.getElementById('create-button');
  createItemBtn.onclick = sendItem;
};

window.onload = main;
