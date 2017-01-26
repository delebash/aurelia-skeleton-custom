import {Aurelia } from 'aurelia-framework';
import environment from '../environment';

export function configureResources(aurelia, globalConfig) {
    if (environment.testing) {
        aurelia.use
            .globalResources([]);
    }
}
