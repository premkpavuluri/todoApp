const loginHandler = (users) => (req, res) => {
  const { username, password } = req.body;
  const userInfo = users[username];

  if (!userInfo) {
    return res.sendStatus(401);
  }

  const isNameInvalid = userInfo.username !== username;
  const isPasswordInvalid = userInfo.password !== password;
  if (isNameInvalid || isPasswordInvalid) {
    return res.sendStatus(401);
  }

  res.sendStatus(201);
};

module.exports = { loginHandler };
