const signUpPage = (templates) => (req, res) => {
  if (req.query.invalid === 'true') {
    return res.type('html').end(templates.signUpWithError);
  }

  res.type('html').end(templates.signup);
};

const allocateDb = (username, db) => {
  db[username] = { username, lists: [] };
};

const registerUser = (users, todoDb) => (req, res) => {
  const { username, password } = req.body;

  if (users[username] || !username || !password) {
    return res.redirect('/sign-up?invalid=true');
  }

  users[username] = { username, password };
  allocateDb(username, todoDb);

  res.redirect('/login');
};

module.exports = { signUpPage, registerUser };
