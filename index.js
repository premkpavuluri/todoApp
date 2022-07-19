const { createApp } = require('./src/app.js');
require('dotenv').config();
const { loadTemplates } = require('./src/loadTemplates.js');

const config = {
  root: 'public',
  templates: loadTemplates()
};

const users = {
  'prem': {
    username: 'prem',
    password: 'hi'
  }
};

const main = () => {
  const app = createApp(config, users);

  const PORT = 8000;
  app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

main();
