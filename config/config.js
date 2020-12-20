const bcrypt = require('bcryptjs');

const oauth = {
  GOOGLE_CLIENT_KEY: '',
  GOOGLE_CLIENT_ID: '',
  GOOGLE_CLIENT_SECRET: '',
  GOOGLE_CLIENT_CALLBACK: '/auth/google/callback',

  FACEBOOK_APP_ID: '',
  FACEBOOK_APP_SECRET: '',
  FACEBOOK_APP_CALLBACK: '/auth/facebook/callback',
};

module.exports = {
  port: 3000,
  sessionSecretKey: bcrypt.hashSync('_SECRET_KEY_HERE_', 2),
  oauth,
};
