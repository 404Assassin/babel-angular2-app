# Angular 2 app with Bootstrap4, Babel, Watchify, and SassDoc

A skeleton [Angular 2](https://angular.io/) app built with [Babel](https://babeljs.io/), [Browserify](http://browserify.org/), [Watchify](https://github.com/substack/watchify), [Bootstrap4 alpha](https://github.com/twbs/bootstrap/tree/v4-dev), [SassDoc](http://sassdoc.com/).

This build includes Angular2 beta, JS source maps, trans-compile of both Typescript and ES6 to ES5 using Babel, Browserify/Watchify updates using Watchify fast cached builds, live reload for auto content refresh and a seed ng2 beta app build. Bootstrap4 alpha, CSS auto prefixes, SCSS/SASS documentation using [SassDoc](http://sassdoc.com/)  and CSS source maps.

## Installation
```
run: npm install
```

##Builds by feature

###Preview Build Features

The preview build includes both the CSS and JS. The build includes Bootstrap4 alpha, CSS auto prefixes and CSS source maps. The JS build includes JS source maps, trans-compile of both Typescript and ES6 to ES5 using Babel, Browserify/Watchify update for fast cached builds, live reload for auto content refresh and a seed ng2 beta app build.

run:
```
npm start
```

###Production Build Features

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

###Styles Documentation Build

Parsed style documentation using SC5 Style Guide Generator: http://styleguide.sc5.io/
Style document output is not included as part of either build but can be run separately. Any comments in SCSS/SASS/LESS/PostCSS that include KSS notation will be added to the documentation. Specific KSS documentation as well as annotations types here: https://github.com/kneath/kss/blob/master/SPEC.md. A living style guide demo with specific examples of syntax here: http://demo.styleguide.sc5.io/

To compile doc run:
```
npm run styleguidewatch
```
Documents are generated using a proprietary build process and server. The style guide can be accessed at this url: [http://localhost:3000/](http://localhost:3000/)

###JS unit and end to end tests

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

## Notes

- This is a forked build of [this](https://github.com/shuhei/babel-angular2-app) ng2 beta seed.
- Supports class/parameter decorators and parameter type annotations with [Babel](https://github.com/babel/babel), [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) and [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations).
  - **Parameter decorator is not supported because the syntax is not supported by Babel's parser.**
- Watch bundles JavaScript files into one file with Browserify, Watchify and livereload.

## License
[ISC](https://opensource.org/licenses/ISC)