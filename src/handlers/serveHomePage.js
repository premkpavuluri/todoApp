const serveHomePage = (templates) => (req, res) => {
  return res.type('html').send(templates.homePage);
};

module.exports = { serveHomePage };;
