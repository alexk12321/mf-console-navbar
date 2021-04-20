import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Account, AccountFeature, AccountStyleSetting, Entity} from '~/models/account.model';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class AccountsService {
  public static VATBOX_SERVICE_NAME = 'account-setup';
  public static API_BASE = `/api/${AccountsService.VATBOX_SERVICE_NAME}/v2`;
  public static ADMIN_API = `${AccountsService.API_BASE}/admin`;
  public static STYLE_USER_SETTINGS = `${AccountsService.API_BASE}/services/account-settings`;
  public static ENTITIES_LIST = `${AccountsService.API_BASE}/services/info/accounts`;
  public static ACCOUNT_API = `${AccountsService.API_BASE}/accounts`;

  constructor(private http: HttpClient) {}

  /**
   * Get all accounts from accounts setup service
   * filterInactiveAccounts is query parameter for filtering active/inactive accounts - default api returns all accounts
   */
  public getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${AccountsService.ADMIN_API}/accounts`);
  }

  /**
   * Get Account Details from accounts setup service
   * Returns account details
   */
  public getAccountDetails(accountId): Observable<any> {
    return this.http.get<any>(`${AccountsService.ACCOUNT_API}/${accountId}`);
  }

  /**
   * Get Account style settings
   */
  public getAccountSettings(accountId): Observable<AccountStyleSetting> {
    return this.http.get<AccountStyleSetting>(`${AccountsService.STYLE_USER_SETTINGS}/${accountId}`);
  }

  /**
   * Get Features enabled for account
   */
  public getAccountFeatures(accountId): Observable<AccountFeature[]> {
    return this.http.get<AccountFeature[]>(`${AccountsService.ADMIN_API}/accounts/${accountId}/features`);
  }

  /**
   * Get Entities List
   */
  public getEntitiesList(accountId): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${AccountsService.ENTITIES_LIST}/${accountId}/entities/flat`);
  }

  /**
   * Get Is Account Sku2 user
   */
  public getAccountIsSku2(accountId) {
    return this.http.get<any>(`${AccountsService.ACCOUNT_API}/${accountId}/products/settings`)
      .pipe(
        map((res) => res.SapConcurTaxAssurance && !!res.SapConcurTaxAssurance.isSku2)
      )
  }
}

