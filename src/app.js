const express = require('express');
const morgan = require('morgan');

const createApp = () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
