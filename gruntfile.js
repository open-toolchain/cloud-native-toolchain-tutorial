/*jslint node: true */
'use strict';

var _ = require('lodash');

//var desireds = require('./desireds');
var browsers = {
  chrome: {browserName: 'chrome'},
  firefox: {browserName: 'firefox'},
  explorer: {browserName: 'internet explorer'},
};

var gruntConfig = {
  env: {
      // dynamically filled
  },
  simplemocha: {
    sauce: {
      options: {
        timeout: 60000,
        reporter: 'mocha-jenkins-reporter',
        reporterOptions:
        {
          junit_report_name: 'Tests',
          junit_report_path: 'test/saucelabs-results.xml',
          junit_report_stac: 1,
        },
      },
      src: ['test/sauce/**/*-specs.js'],
    },
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc',
    },
    gruntfile: {
      src: 'Gruntfile.js',
    },
    test: {
      options: {
        jshintrc: 'test/.jshintrc',
      },
      src: ['test/**/*.js'],
    },
  },
  concurrent: {
    'test-sauce': [], // dynamically filled
  },
  watch: {
    gruntfile: {
      files: '<%= jshint.gruntfile.src %>',
      tasks: ['jshint:gruntfile'],
    },
    test: {
      files: '<%= jshint.test.src %>',
      tasks: ['jshint:test'],
    },
  },
};

_.forIn(browsers, function(browser, key) {
  gruntConfig.env[key] = {
    DESIRED: JSON.stringify(browser),
  };
  gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
});

//console.log(gruntConfig);

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig(gruntConfig);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['test:sauce:' + _(browsers).keys().first()]);

  _.forIn(browsers, function(browser, key) {
    grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
  });

  grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);
};
