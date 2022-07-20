const loginPageHandler = (templates) => (req, res) => {
  if (req.session.isPopulated) {
    return res.redirect('/todo/home');
  }

  if (req.query.invalid === 'true') {
    return res.type('html').end(templates.loginWithError);
  }

  res.type('html').end(templates.login);
};

module.exports = { loginPageHandler };
