const xhrRequest = (request, onStatus, handler, altHandler, body = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === onStatus) {
      return handler(xhr);
    }

    altHandler(xhr);
  };

  xhr.open(request.method, request.url);
  xhr.send(body);
};

const fetchFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);

  return new URLSearchParams(formData);
};

const redirectToHome = (xhr) => {
  window.location.href = '/home';
};

const invalidWarning = (xhr) => {
  const messageElement = document.querySelector('#message');

  messageElement.innerText = 'Invalid username/password';
  messageElement.style.color = 'red';
};

const login = () => {
  const credentials = fetchFormData();
  const req = { method: 'POST', url: '/login' };

  xhrRequest(req, 201, redirectToHome, invalidWarning, credentials);
};

const main = () => {
  const submitButton = document.querySelector('#submit-btn');
  submitButton.onclick = login;
};

window.onload = main;
