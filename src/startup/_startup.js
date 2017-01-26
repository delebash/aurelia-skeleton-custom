//#region import

import './_polyfills';
import {Aurelia } from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Registry} from '../services/registry';
import environment from '../environment';
import { configurePlugins } from './plugins';
import { configureFeatures } from './features';
import { configureResources } from './resources';

//#endregion

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
(Promise).config({
    warnings: {
        wForgottenReturn: false
    }
});

export class Startup {

    //#region Properties

    registry;
    aurelia;
    config;

    //#endregion

    constructor() {
    }

    //#region Init+Start

    init(aurelia) {
        let t = this,
            client = new HttpClient();
        t.aurelia = aurelia;

        t.aurelia.use
            .standardConfiguration();

        if (environment.debug) {
            aurelia.use.developmentLogging();
        }

        t.registry = t.aurelia.container.get(Registry);

        client
            .get("config.app.json")
            .then(result => JSON.parse(result.response))
            .then(config => {
                client.get(config.routeUrl)
                    .then(r => {
                        config.routes = t.updateRoutes(config, JSON.parse(r.response));
                        t.registry.set("config", config);

                        configureFeatures(t.aurelia, config);
                        configurePlugins(t.aurelia, config);
                        configureResources(t.aurelia, config)

                        t.start();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    start() {
        let t = this;
        t.config = t.registry.config();

        this.aurelia.start().then(a => a.setRoot(t.config.root));
    }

    //#endregion


    //#region Route conversion/handler

    updateRoutes(config, routes) {
        let viewStrategy = config.viewStrategy;

        for (let i = 0; i < routes.length; i++) {
            switch (viewStrategy.viewModelResolve) {
                default:
                    break;
                case "customFolder":
                    routes[i].moduleId = `${viewStrategy.viewModelBasePath}${routes[i].moduleId}`;
                    break;
            }
        }

        return routes;
    }

    //#endregion
}


