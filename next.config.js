const pkg = require('./package.json');
const rewrites = require('./.config/rewrite');

module.exports = {

  env: {
    NAME: pkg.name,
    VERSION: pkg.version,
    GOOGLE_RECAPTCHA_CLIENT: ''
  },

  reactStrictMode: true,

  // @see https://nextjs.org/docs/api-reference/next.config.js/rewrites
  // Quite powerful see above link for examples
  async rewrites() {
    return [
      ...rewrites,
    ]
  },

  // i18n: {
  //   locales: ['en-US', 'es'],
  //   defaultLocale: 'en-US'
  // }

};
