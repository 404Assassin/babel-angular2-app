import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HelloApp} from './app';
bootstrap(HelloApp, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]).catch(err => console.error(err));
console.error('test error');
console.warn('test warn');
console.info('test info');
console.trace('test trace');
console.dir([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);