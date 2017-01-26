import { bindable } from 'aurelia-framework';

export class Sidebar {

    @bindable router;
    @bindable menus;

    layout;

    constructor() {

    }

    bind(bindingContext) {
        this.layout = bindingContext;
    }
}
