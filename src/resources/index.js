import {FrameworkConfiguration} from 'aurelia-framework';

export * from './validation-bootstrap-renderer';

export function configure(config) {
    config.globalResources([
        './elements/sidebar',
        './elements/topbar',
        './elements/treemenu'
    ]);
}
