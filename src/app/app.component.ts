import {BreakpointObserver} from "@angular/cdk/layout";
import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject, fromEvent, Subject, zip} from "rxjs";
import {Account, EntityStatus} from "~/models/account.model";
import {Currency} from "~/services/configuration/configuration.model";
import {UserService} from "~/services/user/user.service";
import {UserSettingsService} from '~/services/user-settings/user-settings.service';
import {IconsService} from "~/services/icons.service";
import {take} from "rxjs/operators";
import {GateApiService} from "~/services/gate/gate-api.service";
import {Location} from "@angular/common";
import {AccountsService} from "~/services/accounts/accounts.service";
import {MatSidenav} from "@angular/material/sidenav";
import {SimpleAction, Store} from "~/models/store.model";
import {mainStoreSubject$} from "../main.store.subject";
import {NavigationSetupService} from "~/services/navigation/navigation-setup.service";
import {
  ACCOUNT_PREFIX_IN_URL,
  DEFAULT_ACCOUNT_ID,
  DEFAULT_CURRENCY_CODE,
  DEFAULT_PAGE,
  SUPPORTED_CURRENCIES
} from "~/models/app-config.model";
import {environment} from "~/../environments/environment";
import {PortalSupportDialogComponent} from "~/components/portal-support-dialog/portal-support-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {UserSettingsApiService} from "~/services/user-settings/user-settings-api.service";
import {FeaturesService} from "~/services/features/features.service";

declare var analytics;
declare var totango;
declare var totango_options;

@Component({
  selector: "navbar-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject();
  public sidenavColor = '#0d2f52';
  public supportLink = 'https://www.concurtraining.com/cnqr/concur-tax-assurance';
  private defaultStyleSettings = {
    navbarColor: this.sidenavColor,
    chartTheme: 'none',
    logoUrl: '',
  };
  private features = [];
  private user;

  public appIsInitialized$ = new BehaviorSubject(false);

  public store: Store;
  public activeAccountId;

  @ViewChild("sidenav", {static: true})
  public sidenav: MatSidenav;
  public isOpenSideBarByDefault = true;
  public currencies: Currency[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private iconsService: IconsService,
    private userService: UserService,
    private userSettingsService: UserSettingsService,
    private userSettingsApiService: UserSettingsApiService,
    private gateApiService: GateApiService,
    private accountsService: AccountsService,
    private navigationSetupService: NavigationSetupService,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private featuresService: FeaturesService,
  ) {
  }

  public ngOnInit(): void {
    this.iconsService.registerSet();
    this.initializeScreenSizeBreakpoint();
    this.initStoreObject();
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  public onSidenavToggle(): void {
    this.sidenav.toggle();
  }

  /** INIT APPLICATION WITH METADATA */
  private initStoreObject() {
    mainStoreSubject$.store.pipe(take(1)).subscribe((data: SimpleAction) => {
      this.store = data.payload;
      this.user = data.payload.user;
      this.init(data.payload.user.preferences);
    });
  }

  private init(preferences: any) {
    this.initCurrencies(preferences);
    this.getFeaturesList().subscribe((allFeatures) => {
      this.features = allFeatures;
      this.initAccounts();
    });
    this.setAnalyticsEvents();
  }

  private initCurrencies(preferences: any) {
    this.currencies = this.store.configuration.currencies;
    this.store.currency = typeof preferences.currency !== "undefined" ? this.currencies.find(
      i => i.code === preferences.currency
    ) : this.currencies.find(i => i.code === DEFAULT_CURRENCY_CODE);
  }

  private getFeaturesList() {
    return this.featuresService.getAllFeatures();
  }

  private initAccounts() {
    const accountIdFromUrl = this.getAccountIdFromUrl();
    const accountIdFromUrlNumber = parseInt(accountIdFromUrl, 10);

    if (this.hasVatboxAccess) {
      this.accountsService.getAllAccounts().subscribe(accounts => {
        // remove not usefully accounts
        accounts = accounts.filter(acc => !!acc.name);

        // Only active accounts to be shown in the dropdown
        const activeAccounts = accounts.filter(acc => acc.status === EntityStatus.Active || acc.status === EntityStatus.Pending);
        let account = accounts.find(i => i.id === accountIdFromUrlNumber);
        if (!account) {
          /**
           * SELECT DEFAULT ACCOUNT AND CHANGE THE URL IF ACCOUNT ID FROM URL IS INVALID
           * exception -  in case of account with id === 0 it refers to all accounts
           **/
          account = accounts.find(i => i.id === DEFAULT_ACCOUNT_ID);
          this.updateUrl(DEFAULT_ACCOUNT_ID);
        }
        this.activeAccountId = account.id;
        /**
         * Last call before finish the initialization of the app data
         * Get all accounts with entities (childes entities)
         */
        this.initAccountOptions(account, accounts, activeAccounts, () => {
          this.initEnd();
        });
      });
    } else {
      let account: any;
      if (this.user.accounts.map((i) => i.id).includes(accountIdFromUrlNumber)) {
        account = this.user.accounts.find((i) => i.id === accountIdFromUrlNumber);
      } else {
        account = this.user.accounts[0];
        this.activeAccountId = account.id;
        this.updateUrl(account.id);
      }

      this.initAccountOptions(account, this.user.accounts, this.user.accounts, () => {
        this.setTotangoOptions();
        this.initEnd();
      });
    }
  }

  private updatePermissions(accountFeatures, isSKU2Account) {
    // UNCOMENT WHEN FEATURES ENABLED
    // this.navigationSetupService.initialize(this.isInternalUser, accountFeatures, this.features);
    this.navigationSetupService.initialize(true, accountFeatures, this.features, isSKU2Account);
    return this.navigationSetupService.getPermittedFeatures();
  }

  private updateStyleSettings(styleSettings) {
    const settings = styleSettings || this.defaultStyleSettings;
    this.sidenavColor = settings.navbarColor;
    return settings;
  }

  private getAccountIdFromUrl() {
    let url = this.location.path();
    url = url && url.endsWith("/") ? url : `${url}/`;
    const matchString = `\/${ACCOUNT_PREFIX_IN_URL}\\/(-?\\d+)\/`;

    try {
      return url.match(matchString)[1]; // taking the first group of the regex match (.*?)
    } catch (e) {
      console.log("did not found any match in url", e);
    }
    return null;
  }

  private updateUrl(accountId) {
    const urlWithAccountId = `/${ACCOUNT_PREFIX_IN_URL}/${accountId}`;
    const fullPath = `${urlWithAccountId}/${DEFAULT_PAGE}`;
    this.location.replaceState(fullPath);
  }

  private updateStore(props) {
    this.store = {...this.store, ...props};
    console.log(
      "%c updateStorec NAVBAR update store:",
      "color:green",
      this.store
    );
  }

  /**
   * After all meta data collected send it to the store Subject,
   * this observable will populated to all child apps (micro frontend apps)
   */
  private initEnd() {
    this.updateMainStoreObject("AppInitialized");
    this.appIsInitialized$.next(true);
  }

  /**
   * update mainStoreObject with current Store state
   * (DO NOT mix with store update fnc)
   */
  private updateMainStoreObject(action) {
    mainStoreSubject$.store.next({
      action,
      payload: {...this.store}
    });
  }

  private initAccountOptions(account, accounts, activeAccounts, cb) {
    zip(
      this.accountsService.getAccountDetails(account.id),
      this.accountsService.getEntitiesList(account.id),
      this.accountsService.getAccountSettings(account.id),
      this.accountsService.getAccountFeatures(account.id),
      this.accountsService.getAccountIsSku2(account.id),
    ).subscribe(([accountDetails, entities, accountSettings = {}, accountFeatures, isSku2Account]) => {
      const sortedAccounts = accounts.map(i => i).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      const sortedActiveAccounts = activeAccounts.map(i => i).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      const sortedEntities = entities.map(i => i).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      const settings = this.updateStyleSettings(accountSettings);
      const availableFeatureIds = this.updatePermissions(accountFeatures.map((i) => i.featureId), isSku2Account);
      account = {
        ...account,
        isSku2Account,
        tier: accountDetails.tier,
        name: accountDetails.name,
        countryCode: accountDetails.countryCode,
        status: accountDetails.status,
        sfId: accountDetails.sfId,
        isTestAccount: accountDetails.isTestAccount
      };
      this.updateStore({
        account,
        accounts: sortedAccounts,
        activeAccounts: sortedActiveAccounts,
        entities: sortedEntities,
        accountStyleSettings: settings,
        features: availableFeatureIds,
        isInitializing: false,
      });
      if (cb) cb();
    });
  }

  /** END INIT APPLICATIONS SECTION */

  public get isInternalUser() {
    return new RegExp('@vatbox.com|@sourcico.com').test(this.user.email);
  }

  public get hasVatboxAccess() {
    if (this.user && this.user.accesses && this.user.accesses.filter((i) => i.id === -1).length) {
      return true;
    }
    return false;
  }

  public get isAdminUser() {
    return this.user.isAdmin;
  }

  public get hasMultipleAccounts() {
    return !!(this.store && this.store.activeAccounts && this.store.activeAccounts.length > 1);
  }

  public get appIsReady() {
    return this.store ? !this.store.isInitializing : false;
  }

  public get accountId() {
    if (this.appIsReady) {
      return this.store.account.id;
    }
  }

  public changeAccount(account: Account) {
    // checking active ID because this function (changeAccount) is looping if update account object
    if (this.appIsReady && this.accountId !== account.id) {
      this.initAccountOptions(account, this.store.accounts, this.store.activeAccounts, () => {
        this.updateUrl(account.id);
        this.updateMainStoreObject("AccountChanged");
      });
    }
  }

  public changeCurrency(currency) {
    if (this.appIsReady) {
      if (currency.code !== this.store.currency.code) {
        this.userSettingsService.saveDefaultCurrency(currency);
        this.updateStore({currency});
        this.updateMainStoreObject("CurrencyChanged");
      }
    }
  }

  public logout() {
    this.userService.logout();
  }

  /**
   * Clicking twice on user email (on top of the page) will modify "isDemoAccount" parameter
   */
  public activateIsDemoAccount() {
    if (this.isInternalUser) {
      this.updateStore({isDemoAccount: !this.isDemoAccountActive});
      this.updateMainStoreObject("SwitchDemoAccount");
    }
  }

  public get isDemoAccountActive() {
    if (this.isInternalUser) {
      return this.store.isDemoAccount;
    }
    return false;
  }

  /**
   * If the screen size is bigger then 1440px side nav is open
   */
  private initializeScreenSizeBreakpoint() {
    this.breakpointObserver
      .observe(["(min-width: 1440px)"])
      .subscribe(result => {
        this.isOpenSideBarByDefault = result.matches;
      });
  }

  /**
   Handle analytics events
   */
  setAnalyticsEvents() {
    let myEl;
    if (this.isAnalytics) {
      /**Identity**/
      analytics.identify(this.user.email);

      /** Click event */
      fromEvent(document, "click").subscribe((event: any) => {
        // Find the closest element with id
        event.path.some(element => {
          myEl = element;
          return !!element.id;
        });
        // Send event to Segment
        analytics.track("click", {
          elementID: myEl.id,
          tagName: myEl.tagName
        });
      });

      /** Routing event */
      window.addEventListener("popstate", event => {
        if (this.isAnalytics) {
          analytics.page({
            userId: this.store.user.id,
            event: "Navigate"
          });
          if (
            totango_options &&
            totango_options.user &&
            totango_options.user.id &&
            !this.isInternalUser) {
            this.createRecordTotango('__heartbeat', 'Solex ' + this.capitalize_Words(window.location.pathname.split('/')[3]));
          }
        }
      });
    }
  }

  private get isAnalytics() {
    if (typeof totango !== "undefined") {
      return environment.production;
    }
    return false;
  }

  /** Set Totango global object created in the shell app */
  private setTotangoOptions() {
    if (this.isAnalytics && totango) {
      totango_options.account = {
        id: this.store.account.id,
        name: this.store.account.name
      };

      totango_options.user = {
        id: this.store.user.email,
        role: "ExternalUser"
      };
      totango.go(totango_options);
    }
  }

  private createRecordTotango(event: string, module: string = null) {
    if (module === null) totango.track(event);
    else totango.track(event, module);
  }

  /** Support button form -- deprecated for now  */
  public onClickSupport() {
    let compRef = this.dialog.open(PortalSupportDialogComponent, {
      panelClass: 'custom-dialog-container',
      position: {
        bottom: '60px',
        right: '70px'
      }
    });
    compRef.componentInstance.user = this.store.user;
  }

  private capitalize_Words(str) {
    if (str) return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    return '';
  }
}
