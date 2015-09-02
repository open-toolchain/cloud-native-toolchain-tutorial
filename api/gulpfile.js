/**
* Reference Gulpfile
*/

var gulp = require('gulp'),
    paths = {
        html:['client/**/*.html','server/**/*.html'],
        css:['client/**/*.css','server/**/*.css'],
        js:['client/**/*.js','server/**/*.js','routes/**/*.js','!.meteor/**/*.js','app.js']
    },
    runSequence = require('run-sequence');
var karma = require('karma').server;
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');

/*
Gulp tasks for linting
@ Shrenik Shah
*/
gulp.task('default', function (callback) {
    runSequence('lint','dev-unit',callback);
});

gulp.task('lint-js', function () {
    var jshint = require('gulp-jshint');

    return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-css', function () {
    var csslint = require('gulp-csslint');

    return gulp.src(paths.css)
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('lint-html', function () {
    var htmllint = require('gulp-htmllint');

    return gulp.src(paths.html)
    .pipe(htmllint({
        htmllintrc: true
    }));
});

gulp.task('lint-jscs', function () {
    var jscs = require('gulp-jscs');

    return gulp.src(paths.js)
    .pipe(jscs());
});

/*
Gulp tasks for unit tests
@ Jesse Antoszyk
*/
//Task for karma (frontend) unit tests
gulp.task('dev-karma', function (done) {
    karma.start({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
        }, done);
});

//Task for backend unit tests
gulp.task('dev-backend', function(){
    return gulp.src('tests/unit/server/**/*spec.js', {read: false})
        .pipe(mocha({
            globals:['expect'],
            timeout: 3000,
            ignoreLeaks: true,
            ui: 'bdd',
            colors: true,
            reporter: 'tap'
        }));
});

gulp.task('dev-setup', function(){
    return bower();
});

gulp.task('lint', ['lint-js','lint-css','lint-html','lint-jscs']);
gulp.task('dev-unit', ['dev-karma','dev-backend']);
