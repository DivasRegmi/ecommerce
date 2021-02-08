module.exports = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_CALLBACK: 'http://localhost:3000/api/auth/google/callback',

  FACEBOOK_APP_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  FACEBOOK_APP_CALLBACK: 'http://localhost:3000/api/auth/facebook/callback',
};
