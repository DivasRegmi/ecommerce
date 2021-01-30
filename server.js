const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const { sequelize } = require('./src/models/index');
const sessionConfig = require('./config/session');
const passportconfig = require('./config/passport.config');

const app = express();

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

/**
 *   Adding middlewares
 * */

app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '25mb' }));
app.use(session(sessionConfig));
app.use(passport.initialize());
passportconfig(passport);
app.use(passport.session());

// mogran logging

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  })
);

/**
 *   Testing database connection
 * */

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

/**
 * init Router
 */

app.use('/api', require('./src/routes'));

/* ***************************** */

app.use((err, req, res) => {
  console.log('from Next');
  console.error(err);
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send({ err: err.message || 'Internal server error.' });
});

const Port = process.env.PORT;
app.listen(Port, () =>
  console.log(`Server running on http://localhost:${Port}`)
);
