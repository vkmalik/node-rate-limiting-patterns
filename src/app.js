const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

app.use(express.json());

app.use(
  '/api',
  rateLimiter({
    windowMs: 60_000,
    maxRequests: 5,
  }),
  apiRoutes
);

module.exports = app;
