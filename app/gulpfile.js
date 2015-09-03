/**
* Reference Gulpfile
*/

var gulp = require('gulp');

//These paths need to be changed based on the location of the respective files on your application
var paths = {
  html:['client/**/*.html','server/**/*.html'],
  css:['client/**/*.css','server/**/*.css'],
  js:['client/**/*.js','server/**/*.js','routes/**/*.js','!.meteor/**/*.js','app.js'],
};
var runSequence = require('run-sequence');
var karma = require('karma').server;
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var htmllint = require('gulp-htmllint');
var jscs = require('gulp-jscs');
var licenseFind = require('gulp-license-finder');
var del = require('del');
var fs = require('fs');
var csarLicense = require('./automation/buildTools/license/tasks/gulp-csar-license.js');
var bowerLicense = require('./automation/buildTools/license/tasks/gulp-bower-license.js');

/*
Gulp tasks for linting
@ Shrenik Shah
*/
gulp.task('default', function(callback) {
  runSequence('lint', 'dev-unit', callback);
});

gulp.task('lint-js', function() {
  return gulp.src(paths.js)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Uses the .csslintrc file with some default configurations. Update the .csslintrc file based on the project requirements
gulp.task('lint-css', function() {
  return gulp.src(paths.css)
  .pipe(csslint('.csslintrc'))
  .pipe(csslint.reporter());
});

// Uses the .htmllintrc file with some default configurations. Update the .htmllintrc file based on the project requirements
gulp.task('lint-html', function() {
  return gulp.src(paths.html)
  .pipe(htmllint({
    htmllintrc: true,
  }));
});

// Uses the .jscsrc file with some default configurations. Update the .jscsrc file based on the project requirements
gulp.task('lint-jscs', function() {
  return gulp.src(paths.js)
  .pipe(jscs());
});

gulp.task('lint', ['lint-js','lint-css','lint-html','lint-jscs']);

/*
Gulp tasks for unit tests
@ Jesse Antoszyk
*/

//Task for karma (frontend) unit tests
gulp.task('dev-karma', function(done) {
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true,
  }, done);
});

//Task for backend unit tests
gulp.task('dev-backend', function() {
  return gulp.src('tests/unit/server/**/*spec.js', {read: false})
    .pipe(mocha({
      globals:['expect'],
      timeout: 3000,
      ignoreLeaks: true,
      ui: 'bdd',
      colors: true,
      reporter: 'tap',
    }));
});

gulp.task('dev-setup', function() {
  return bower();
});

/*
 call test execution for load test
 @Uma
 */

//var http = require('http');
var https = require('https');
var token = 'cbe0c2e623d2384a223690ed5b0a32680611b6411c5e4141826ee9a7cc3bbbae';
var configId = 3120560;
var url = 'https://api.loadimpact.com';
var status;
var done = false;

var options = {
  auth: token,
  hostname: url,
  path: '/v2/test-configs/' + configId + '/start',
  method: 'POST',
};
console.log(options.path);

var test = https.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    console.log('BODY: ' + chunk);
  });
});

test.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

test.end();

while (!done) {
  setTimeout(function() {
    status = https.get(url + '/tests/' + test.id, function(res) {
      console.log('Got response: ' + res.statusCode);

      if (status.status > 2) {
        done = true;
      }
    }).on('error', function(e) {
      console.log('Got error: ' + e.message);
    });
  });
}

gulp.task('lint', ['lint-js','lint-css','lint-html','lint-jscs']);

gulp.task('dev-unit', ['dev-karma','dev-backend']);

/*
Gulp tasks to perform the license checks
*/

// Runs the "clean" task and creates a directory called "log"
gulp.task('mkdir:log', ['clean'], function() {
  try {
    fs.mkdirSync('log');
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
});

// Deletes all the files from the /log folder that is generated when running the "runLicense" task
gulp.task('clean', function() {
  return del.sync(['log'], {
    force: true,
  }, function(err, paths) {
    if (err) {
      console.error('Error cleaning project: ' + err);
    } else {
      if (paths && paths.length > 0) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
      }
    }
  });
});

/*
Task to run the bower license checks. This task can be run with other license checking tasks by appending it to the "runLicense" task below
Run the "bower install" command before running the Bower scans so that it generates the bower_components folder
Change the "output" file location below if required.
Stores the output in a CSV format
*/
gulp.task('bower_license', [], function(cb) {
  var options = {
    directory: 'bower_components',
    output: 'log/bower_license.csv',
    format: 'csv',
  };
  return bowerLicense(options);
});

/*
Task to run the NPM checks. This task can be run with other license checking tasks by appending it to the "runLicense" task below
Change the output file location below if required (currently it stores in "log" folder)
Stores the output in a CSV format
*/

gulp.task('license_finder', function() {
  return licenseFind('npm-licenses.csv', {
    production: false,
    depth: 5,
    csv: true,
  }).pipe(gulp.dest('log/'));
});

/*
Task to run the CSAR scans
This task can be run with other license checking tasks by appending it to the "runLicense" task below
The output files are stored in the /log/csar/ folder
For possible options field, checkout the "defaultOptions" object in the /automation/buildTools/license/tasks/gulp-csar-license.js file
*/

gulp.task('csar_license', [], function(cb) {
  var options = {};
  return csarLicense(options);
});

// Main task that runs all CSAR and other license checking tasks
gulp.task('runLicense', ['mkdir:log'], function() {
  gulp.start('license_finder', 'csar_license');
});
