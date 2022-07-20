const isUserValid = (userInfo, { username, password }) => {
  if (!userInfo) {
    return false;
  }

  const isNameInvalid = userInfo.username !== username;
  const isPasswordInvalid = userInfo.password !== password;
  if (isNameInvalid || isPasswordInvalid) {
    return false;
  }

  return true;
};

const createSession = (username) => {
  const sessionId = new Date().getTime();
  return { sessionId, username };
};

const loginHandler = (users) => (req, res) => {
  const { username, password } = req.body;
  const userInfo = users[username];

  if (!isUserValid(userInfo, { username, password })) {
    return res.redirect('/login?invalid=true');
  }

  const session = createSession(username);
  req.session = session;

  res.redirect('/todo/home');
};

module.exports = { loginHandler };
