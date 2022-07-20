const { createApp } = require('./src/app.js');
require('dotenv').config();
const { loadTemplates } = require('./src/utils/loadTemplates.js');

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

const todos = {
  "prem": {
    "username": "prem",
    "lastListId": 2,
    "lists": [
      {
        "id": 1,
        "title": "Travel",
        "lastTodoId": "todoid-2",
        "todos": [
          {
            "id": "todoid-1",
            "name": "pack lauggage",
            "isDone": false
          },
          {
            "id": "todoid-2",
            "name": "check map",
            "isDone": false
          }
        ]
      },
      {
        "id": 2,
        "title": "Food",
        "lastTodoId": "todoid-1",
        "todos": [
          {
            "id": "todoid-1",
            "name": "Buy vegitables",
            "isDone": false
          }
        ]
      }
    ]
  }
};

const main = () => {
  const app = createApp(config, users, todos);

  const PORT = 8000;
  app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
};

main();
