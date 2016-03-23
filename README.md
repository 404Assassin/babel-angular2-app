# Angular 2 app with Bootstrap4, Babel, Watchify, and sass doc

A skeleton [Angular 2](https://angular.io/) app built with [Babel](https://babeljs.io/), [Browserify](http://browserify.org/), [Watchify](https://github.com/substack/watchify), [Bootstrap4 alpha](https://github.com/twbs/bootstrap/tree/v4-dev), [sassdoc](http://sassdoc.com/).

This build includes Angular2 beta, JS source maps, trans-compile of both Typescript and ES6 to ES5 using Babel, Browserify/Watchify updates using Watchify fast cached builds, live reload for auto content refresh and a seed ng2 beta app build. Bootstrap4 alpha, CSS auto prefixes, SCSS/SASS documentation using [sassdoc](http://sassdoc.com/)  and CSS source maps.

### Installation
```
run: npm install
```

###Builds by feature
####Preview Build Features
The preview build includes both the CSS and JS. The build includes Bootstrap4 alpha, CSS auto prefixes and CSS source maps. The JS build includes JS source maps, trans-compile of both Typescript and ES6 to ES5 using Babel, Browserify/Watchify update for fast cached builds, live reload for auto content refresh and a seed ng2 beta app build.

run:
```
npm start
```

####Production Build Features
Production version includes CSS mimification and CSS auto prefixes. Production does not include source maps and style document output.
To compile/transpile for production first,

run:
```
npm run clean
```
then run,
```
npm run build
```

####Styles Documentation Build
SCSS/SASS documentation using sassdoc: http://sassdoc.com/
Style document output is not included as part of either build but can be run separately. Any comments in SCSS/SASS that include three escapes ‘///' will be added to the documentation. Specific annotations types here: http://sassdoc.com/annotations/

To compile doc run:
```
npm run docs
```
Documents output to this url: http://localhost:9090/css/sassdoc/index.html

####JS unit and end to end tests
Unit and e2e tests:
```
npm test
```
Unit tests:

```
npm run unit
```
e2e tests:

```
npm run e2e
```

### Notes
- This is a forked build of [this](https://github.com/shuhei/babel-angular2-app) ng2 beta seed.
- Supports class/parameter decorators and parameter type annotations with [Babel](https://github.com/babel/babel), [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) and [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations).
  - **Parameter decorator is not supported because the syntax is not supported by Babel's parser.**
- Watch bundles JavaScript files into one file with Browserify, Watchify and livereload.

### License

[ISC](https://opensource.org/licenses/ISC)