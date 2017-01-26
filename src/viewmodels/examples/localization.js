import { inject } from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(I18N)
export class Localization {

    i18n;

    constructor(i18n) {
        this.i18n = i18n;
    }

    bind() {
        this.i18n.setLocale('hu');
    }

    canDeactivate() {
        return this.i18n.setLocale('en').then(_ => true);
    }
}
