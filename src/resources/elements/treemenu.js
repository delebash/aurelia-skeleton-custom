//#region import

import { bindable, containerless} from 'aurelia-framework';
import {inject} from 'aurelia-framework'
import { Router } from 'aurelia-router';
import {Registry} from '../../services/registry';

//#endregion

@inject(Element,Registry,Router)
@containerless
export class Treemenu {

    //#region Bindables

    @bindable currentMenu;
    @bindable menuitems;
    @bindable childTree;

    //#endregion

    //#region Other properties

    element;
    registry;
    router;
    layout;
    filteredList;
    parent;
    currentLayout;

    //#endregion

    constructor(element, registry, router) {
        this.element = element;
        this.registry = registry;
        this.router = router;
        this.layout = registry.get("layout");
        this.filteredList = null;
    }

    //#region au events

    bind( bindingContext ) {
        this.parent = bindingContext;
    }

    attached() {
        let currentName = this.currentMenu ? this.currentMenu.name : null;
        this.filteredList = this.filter(currentName);
    }

    //#endregion

    click(event) {
        let link = (event.target).closest('a'),
            submenu = link.parentNode.querySelector('ul');

        if (submenu) {
            event.preventDefault();
            submenu.classList.toggle('tree-hide');
            link.classList.toggle('tree-hidden');
        } else {

            /*this.element.dispatchEvent(
                new CustomEvent('on-treeitem-click', {
                    bubbles: true,
                    detail: { hasChildren: submenu.length > 0 }
                })
            );*/

            this.layout.menuClick(event);
        }

        return true;
    }

    //#endregion

    //#region Helpers

    hasChildren(parentName) {
        let result = this.filter(parentName);
        return result.length > 0;
    }

    filter(parentName) {
        let t = this;

        let items = this.menuitems.filter(function (item) {
            return item.settings.parent === parentName;
        });

        for (let i = 0; i < items.length; i++) {
            items[i].hasChildren = this.hasChildren(items[i].name);
        }

        return items;
    }

    generate(route) {
        if (route.settings && route.settings.isRoute && route.settings.isRoute === true) {
            return this.router.generate(route.name);
        } else {
            let path = Array.isArray(route.route) === true ? route.route[0] : route.route;
            if ((this.router.options).pushState === false) {
                path = `#/${path}`;
            }

            return path;
        }
    }

    //#endregion
}
