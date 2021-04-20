import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Category, Country, Currency, Tooltip} from "./configuration.model";
import {map} from "rxjs/operators";

@Injectable()
export class ConfigurationAPIService {
  public static VATBOX_SERVICE_NAME = "configuration";
  public static DYNOCONFIG = 'dynoconfig-service';
  public static GET_COUNTRIES_API = `/api/${ConfigurationAPIService.VATBOX_SERVICE_NAME}/v2.0/countries`;
  public static GET_CURRENCIES_API = `/api/${ConfigurationAPIService.DYNOCONFIG}/v1/collections/solexsupportedcurrencies`;
  public static GET_CATEGORIES_API = `/api/${ConfigurationAPIService.VATBOX_SERVICE_NAME}/v1.0/category/all`;
  public static GET_TOOLTIP_API = `/api/${ConfigurationAPIService.DYNOCONFIG}/v1/collections/solextooltip`;

  constructor(private http: HttpClient) {
  }

  public getCountries(): Observable<Country[]> {
    return this.http
      .get(ConfigurationAPIService.GET_COUNTRIES_API)
      .pipe(
        map((countries: Country[]) => countries.sort((a, b) => (a.name <= b.name ? -1 : 1)))
      );
  }

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get(
      ConfigurationAPIService.GET_CURRENCIES_API
    ) as Observable<Currency[]>;
  }

  public getTooltips(): Observable<Tooltip[]> {
    return this.http.get(
      ConfigurationAPIService.GET_TOOLTIP_API
    ) as Observable<Tooltip[]>;
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      ConfigurationAPIService.GET_CATEGORIES_API
    );
  }
}
