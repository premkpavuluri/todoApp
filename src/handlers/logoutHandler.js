const logoutHandler = (req, res) => {
  req.session = null;

  res.redirect('/login');
};

module.exports = { logoutHandler };
