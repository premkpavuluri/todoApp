const express = require('express');
const morgan = require('morgan');

const { loginHandler } = require('./handlers/loginHandler.js');

const createApp = (appConfig, users) => {
  const app = express();

  if (process.env.ENVIRONMENT === 'PRODUCTION') {
    app.use(morgan('dev'));
  }

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(appConfig.root));

  app.post('/login', loginHandler(users));

  return app;
};

module.exports = { createApp };
