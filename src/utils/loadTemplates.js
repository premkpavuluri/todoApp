const fs = require('fs');

const readFile = (fileName) => fs.readFileSync(fileName, 'utf-8');

const loadTemplates = () => {
  const login = readFile('templates/login.html');
  const loginWithError = readFile('templates/invalidLogin.html');
  const homePage = readFile('templates/home.html');
  const listPage = readFile('templates/list.html');
  const signUpWithError = readFile('templates/signUpWithError.html');
  const signup = readFile('templates/signUp.html');

  return { login, loginWithError, homePage, listPage, signup, signUpWithError };
};

module.exports = { loadTemplates };
