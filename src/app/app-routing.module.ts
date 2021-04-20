import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmptyRouteComponent} from './components/empty-route/empty-route.component';
import {APP_BASE_HREF} from '@angular/common';
import {
  ACC_ID_ROUTE_PARAM_NAME,
  ACCOUNT_PREFIX_IN_URL,
  DEFAULT_PAGE,
  NO_SELECTED_ACCOUNT_FLAG
} from "~/models/app-config.model";

const routes: Routes = [
  {
    path: `${ACCOUNT_PREFIX_IN_URL}/:${ACC_ID_ROUTE_PARAM_NAME}`,
    children: [
      {
        path: '',
        redirectTo: `${DEFAULT_PAGE}`,
        pathMatch: 'full'
      },
      {
        path: 'dashboards',
        redirectTo: `${DEFAULT_PAGE}`,
        pathMatch: 'full'
      },
      { path: '**', component: EmptyRouteComponent }
    ],
  },
  {
    path: '',
    redirectTo: `${ACCOUNT_PREFIX_IN_URL}/${NO_SELECTED_ACCOUNT_FLAG}`,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
  ],
})
export class AppRoutingModule { }
