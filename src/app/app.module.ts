import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './components/empty-route/empty-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssetUrlPipe } from './shared/pipes/assets.pipe';
import { loadAppConfigurations } from './app.initialize-configurations';
import { CookiesService } from '~/services/cookies/cookies.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsService } from '~/services/icons.service';
import { ConfigurationAPIService } from '~/services/configuration/configuration-api.service';
import { UserService } from '~/services/user/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from '~/components/navigation/navigation.component';
import { PortalSupportDialogComponent } from '~/components/portal-support-dialog/portal-support-dialog.component';
import { PortalSupportDialogService } from '~/components/portal-support-dialog/portal-support-dialog.service';
import { CustomizeAutoCompleteComponent } from '~/components/customize-auto-complete/customize-auto-complete.component';
import { GateApiService } from "~/services/gate/gate-api.service";
import { AccountsService } from "~/services/accounts/accounts.service";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from "@angular/material/input";

import { MatSnackBarModule } from '@angular/material/snack-bar'
import { NavigationSetupService } from "~/services/navigation/navigation-setup.service";
import { UserMockService } from "~/services/user/user-mock.service";
import { SnackbarComponent } from "~/components/snack-bar/snack-bar.component";
import { InfoDialogComponent } from '~/components/dialog/types/info-dialog.component';
import { DialogContainerComponent } from '~/components/dialog/container/dialog-container.component';
import { ConfirmDialogComponent } from '~/components/dialog/types/confirm-dialog.component';
import { ErrorDialogComponent } from '~/components/dialog/types/error-dialog.component';
import { UserSettingsService } from "~/services/user-settings/user-settings.service";
import { UserSettingsApiService } from "~/services/user-settings/user-settings-api.service";
import { FeaturesService } from "~/services/features/features.service";
import { CapuaService } from "~/services/capua/capua.service";
import { SolexAuthInterceptor } from "~/interceptors/solex-auth.interceptor";
import { PermissionModule } from "capua";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    AppComponent,
    AssetUrlPipe,
    ConfirmDialogComponent,
    CustomizeAutoCompleteComponent,
    DialogContainerComponent,
    EmptyRouteComponent,
    ErrorDialogComponent,
    InfoDialogComponent,
    NavigationComponent,
    PortalSupportDialogComponent,
    SnackbarComponent,
  ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        PermissionModule,
        // MATERIAL MODULES
        MatAutocompleteModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatDividerModule,
    ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-US'}, // for showing currency right of value
    AccountsService,
    CapuaService,
    ConfigurationAPIService,
    CookiesService,
    FeaturesService,
    GateApiService,
    IconsService,
    NavigationSetupService,
    PortalSupportDialogService,
    UserMockService,
    UserService,
    UserSettingsApiService,
    UserSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadAppConfigurations,
      multi: true,
      deps: [
        UserService,
        UserMockService,
        CapuaService,
        ConfigurationAPIService,
        NavigationSetupService,
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SolexAuthInterceptor,
      multi: true,
    },
  ],
  entryComponents: [PortalSupportDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
