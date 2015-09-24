# Linters in reference application

A [lint](http://en.wikipedia.org/wiki/Lint_programming_tool) tool performs static analysis of source code and flags patterns that might be errors or otherwise cause problems for the developer. More information about the linters used in this reference application can be found below:

## JSHINT

- [JSHint](https://www.npmjs.com/package/gulp-jshint) plugin for Gulp. Checks for the linting errors in the javascript files
- Configurations can be found in the `gulpfile.js` in the task named `lint-js`
- The path for the files to be linted can be changed in the `gulpfile.js` in the `paths.js` object
- The basic configuration settings for jshint can be found in the `.jshintrc` file. Visit this [LINK] (http://jshint.com/docs/options/) to add/edit more configurations in the `.jshintrc` file.

## JSCS

- [JSCS](https://www.npmjs.com/package/gulp-jscs) plugin for Gulp. Checks the code style of javascript files and is used in addition to `jshint` plugin.
- Configurations can be found in the `gulpfile.js` in the task named `lint-jscs`
- The path for the files to be linted can be changed in the `gulpfile.js` in the `paths.js` object
- The basic configuration settings for JSCS can be found in the `.jscsrc` file. Visit this [LINK] (http://jscs.info/overview.html#options) to add/edit more configurations in the `.jscsrc` file.

## HTMLLINT

- [HTMLlint](https://www.npmjs.com/package/gulp-htmllint) plugin for Gulp. Checks for the linting errors in the HTML files
- Configurations can be found in the `gulpfile.js` in the task named `lint-html`
- The path for the files to be linted can be changed in the `gulpfile.js` in the `paths.html` object
- The basic configuration settings for htmllint can be found in the `.htmllintrc` file. Visit this [LINK] (https://github.com/htmllint/htmllint/wiki/Options) to add/edit more configurations in the `.htmllintrc` file.

## CSSLINT

- [CSSLint](https://www.npmjs.com/package/gulp-csslint) plugin for Gulp. Checks for the linting errors in the CSS files
- Configurations can be found in the `gulpfile.js` in the task named `lint-css`
- The path for the files to be linted can be changed in the `gulpfile.js` in the `paths.css` object
- The basic configuration settings for csslint can be found in the `.csslintrc` file. Visit this [LINK] (https://github.com/CSSLint/csslint/wiki/Rules) to add/edit more configurations in the `.csslintrc` file.
