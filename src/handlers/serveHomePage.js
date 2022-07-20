const serveHomePage = (templates) => (req, res) => {
  const { username } = req.session;
  const homePage = templates.homePage.replace('__USERNAME__', username);

  return res.type('html').send(homePage);
};

module.exports = { serveHomePage };
