const { createApp } = require('./src/app.js');
require('dotenv').config();
const { loadTemplates } = require('./src/utils/loadTemplates.js');
const fs = require('fs');

const config = {
  root: 'public',
  templates: loadTemplates(),
  dbPath: './database/todoDb.json',
  credentialsPath: './database/users.json',
  writeFile: fs.writeFileSync
};

const readFile = (fileName) => fs.readFileSync(fileName);

const main = () => {
  const users = JSON.parse(readFile(config.credentialsPath));
  const db = JSON.parse(readFile(config.dbPath));

  const app = createApp(config, users, db);

  const PORT = 8000;
  app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

main();
