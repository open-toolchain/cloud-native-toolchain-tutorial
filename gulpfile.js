var gulp = require('gulp');

//These paths need to be changed based on the location of the respective files on your application
var paths = {
  html:['public/**/*.html','routes/**/*.html'],
  css:['public/**/*.css','routes/**/*.css'],
  js:['public/**/*.js','routes/**/*.js','app.js'],
};
var runSequence = require('run-sequence');
var karma = require('karma').server;
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var htmllint = require('gulp-htmllint');

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
  .pipe(csslint())
  .pipe(csslint.reporter());
});

// Uses the .htmllintrc file with some default configurations. Update the .htmllintrc file based on the project requirements
gulp.task('lint-html', function() {
  return gulp.src(paths.html).pipe(htmllint({
    htmllintrc: true,
  }));
});

gulp.task('lint', ['lint-js','lint-css','lint-html']);

/*
Gulp tasks for unit tests
@ Jesse Antoszyk
*/

//Task for karma (frontend) unit tests
gulp.task('dev-karma', function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true,
  }, done);
});

//Task for backend unit tests
gulp.task('dev-backend', function() {
  return gulp.src('test/unit/server/**/*spec.js', {read: false})
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

gulp.task('dev-unit', ['dev-karma','dev-backend']);
