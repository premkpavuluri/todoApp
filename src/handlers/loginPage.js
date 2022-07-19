const loginPageHandler = (templates) => (req, res, nex) => {
  if (req.query.invalid === 'true') {
    return res.type('html').end(templates.loginWithError);
  }

  res.type('html').end(templates.login);
};

module.exports = { loginPageHandler };
