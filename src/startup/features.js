import {Aurelia } from 'aurelia-framework';
import environment from '../environment';

export function configureFeatures(aurelia, globalConfig) {
    aurelia.use
        .feature('resources');
}
