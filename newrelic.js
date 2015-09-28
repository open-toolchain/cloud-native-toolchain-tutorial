/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

var pkg = require('./package.json');
var APP_NAME = pkg.name || 'unnamed-app';
var ENV_VAR_NAME = 'NEW_RELIC_LICENSE_KEY';
var NewRelicLicenseKey = process.env[ENV_VAR_NAME];

exports.config = {
  /**
   * Array of application names.
   */
  app_name: [APP_NAME],

  /**
   * Your New Relic license key.
   */
  license_key: NewRelicLicenseKey || 'no-license-key-provided',

  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info',
  },
};

exports.initialize = function() {
  if (NewRelicLicenseKey) {
    console.log('New Relic in use.');
    require('newrelic');
  } else {
    console.log('New Relic not in use.');
  }
};
