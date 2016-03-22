import {Component, View, Input} from 'angular2/core';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Greeter} from './services';
@Component({
    selector: 'hello',
    template: '<p>{{ message }}</p>'
})
export class Hello {
    constructor(greeter:Greeter) {
        this.message = greeter.say('hello', 'Angular 2');
    }
}
@Component({
    selector: 'ciao',
    template: '<p>{{ message }}</p>'
})
export class Ciao {
    constructor(greeter:Greeter, routeParams:RouteParams) {
        this.message = greeter.say('ciao', routeParams.get('name'));
    }
}
@Component({
    selector: 'KonNichiwa',
    template: '<p>{{ message }}</p>'
})
export class KonNichiwa {
    constructor(greeter:Greeter, routeParams:RouteParams) {
        this.message = greeter.say('こんにちは', routeParams.get('name'));
    }
}
@Component({
    selector: 'GutenTag',
    template: '<p>{{ message }}</p>'
})
export class GutenTag {
    constructor(greeter:Greeter, routeParams:RouteParams) {
        this.message = greeter.say('guten tag', routeParams.get('name'));
    }
}
@Component({
    selector: 'linker',
    template: '<p><a [href]="url" [title]="name">{{ name }}</a></p>'
})
export class Linker {
    @Input() name;
    @Input() url;
}
@Component({
    selector: 'hello-app',
    viewProviders: [Greeter]
})
@View({
    directives: [ROUTER_DIRECTIVES, Linker],
    template: `
    <div><button><a [routerLink]="['/Hello']">Hello</a></button></div>
    <div><button><a [routerLink]="['/Ciao', { name: 'ng2' }]">Ciao</a></button></div>
    <div><button><a [routerLink]="['/KonNichiwa', { name: 'ng2' }]">Kon'nichiwa</a></button></div>
    <div><button><a [routerLink]="['/GutenTag', { name: 'ng2' }]">guten tag</a></button></div>
    <router-outlet></router-outlet>
    <linker name="tngmakes" url="http://tngmakes.com"></linker>
  `
})
@RouteConfig([
    {path: '/', component: Hello, name: 'Hello'},
    {path: '/ciao/:name', component: Ciao, name: 'Ciao'},
    {path: '/KonNichiwa/:name', component: KonNichiwa, name: 'KonNichiwa'},
    {path: '/GutenTag/:name', component: GutenTag, name: 'GutenTag'}
])
export class HelloApp {
}
