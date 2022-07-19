const { createApp } = require('./src/app.js');
require('dotenv').config();

const config = {
  root: 'public'
};

const users = {
  'prem': {
    username: 'prem',
    password: 'hi'
  }
};

const app = createApp(config, users);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
