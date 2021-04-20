
import { UserService } from '~/services/user/user.service';
import { UserMockService } from '~/services/user/user-mock.service';
import { catchError } from "rxjs/operators";
import { forkJoin, of } from "rxjs";
import { mainStoreSubject$ } from '../main.store.subject';
import { ConfigurationAPIService } from "~/services/configuration/configuration-api.service";
import { CapuaService } from "~/services/capua/capua.service";

/**
 * Initializes Store Object with metadata
 * @param userDetails
 * @param configuration
 */
function initStoreObservable(userDetails, configuration, accounts) {
  mainStoreSubject$.store.next({
    action: 'InitAppNavbar',
    payload: {
      user: userDetails,
      configuration,
      accounts,
      isDemoAccount: false,
      isInitializing: true,
    }
  });
  window.addEventListener('single-spa:app-change', () => {
    console.log('%c single-spa application change NAVBAR', 'color:purple');
  });
}

function formatUserDetails(userDetails) {
  return {
    ...userDetails,
    isAdmin: !!(userDetails.roles && userDetails.roles.filter((i) => (i.template && i.template.name || '').toLowerCase().includes('admin') ).length)
  }
}

/**
 *
 * @param userService
 * @param userMockService
 * @param capuaService
 * @param configurationApiService
 */
export function loadAppConfigurations(
  userService: UserService, userMockService: UserMockService, capuaService: CapuaService,
  configurationApiService: ConfigurationAPIService
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
        forkJoin([
          capuaService.getUserDetails(), // TODO check service - its bring data with missing properties
          configurationApiService.getCountries(),
          configurationApiService.getCurrencies(),
          configurationApiService.getCategories(),
          configurationApiService.getTooltips(),
        ]).pipe(
          catchError((e) => { reject(e); userService.logout(); return of(e); }),
        ).subscribe(([userDetails, countries, currencies, categories, tooltips]) => {
          const sortedCurrencies = currencies.sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1: 0);
          const sortedCategories = categories.sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1: 0);
          initStoreObservable(
            formatUserDetails(userDetails),
            { countries, currencies: sortedCurrencies, categories: sortedCategories, tooltips: tooltips },
            userDetails.accounts
            );
          return resolve();
        });
    });
  };
}

