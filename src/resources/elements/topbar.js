import { bindable } from 'aurelia-framework';

export class Topbar {

    @bindable router;

    layout;

    constructor() {

    }

    bind(bindingContext) {
        this.layout = bindingContext;
    }
}
