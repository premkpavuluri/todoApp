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

const loginHandler = (users) => (req, res) => {
  const { username, password } = req.body;
  const userInfo = users[username];

  if (!isUserValid(userInfo, { username, password })) {
    return res.sendStatus(401);
  }

  res.sendStatus(201);
};

module.exports = { loginHandler };
