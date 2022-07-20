const fs = require('fs');

const readFile = (fileName) => fs.readFileSync(fileName, 'utf-8');

const loadTemplates = () => {
  const login = readFile('templates/login.html');
  const loginWithError = readFile('templates/invalidLogin.html');
  const homePage = readFile('templates/home.html');

  return { login, loginWithError, homePage };
};

module.exports = { loadTemplates };