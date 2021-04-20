import { enableProdMode, NgZone } from "@angular/core";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Router } from "@angular/router";
import { AppModule } from "~/app.module";
import { environment } from "./environments/environment";
import { getSingleSpaExtraProviders, singleSpaAngular } from "single-spa-angular";
import { mainStoreSubject$ } from "./main.store.subject";

if (environment.production) {
  enableProdMode();
}

function domElementGetter() {
  return document.getElementById("navbar");
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps: any) => {
    mainStoreSubject$.store = singleSpaProps.store;
    mainStoreSubject$.store.next({
      action: 'NavigationStartInit',
    });
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: "<navbar-root />",
  domElementGetter,
  Router,
  NgZone
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
