import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Account, Entity} from '~/models/account.model';
import {map} from "rxjs/operators";

@Injectable()
export class GateApiService {
  public static VATBOX_SERVICE_NAME = 'gate';
  public static API_BASE = `/api/${GateApiService.VATBOX_SERVICE_NAME}/v1`;
  public static USER_ROLE_URL = `/api/${GateApiService.VATBOX_SERVICE_NAME}/v1/get_user_role`;
  public static ACCOUNT_WITH_ENTITIES_URL = `/api/${GateApiService.VATBOX_SERVICE_NAME}/v1/account_with_entities`;
  public static GET_ENTITIES_API = `${GateApiService.API_BASE}/entities`;
  public static MATCHED_INVOICES_API = `${GateApiService.API_BASE}/invoices_data/matched_invoices`;

  constructor(private http: HttpClient) {}

  public getUserRole(): Observable<{ role: string }> {
    return this.http.get(GateApiService.USER_ROLE_URL) as Observable<{ role: string }>;
  }

  public getAccountWithEntities(accountId: string = null): Observable<{ account: Account, entities: Entity[] }> {
    return this.http.get(`${GateApiService.ACCOUNT_WITH_ENTITIES_URL}?account_id=${accountId}`)
      .pipe(map((res: { account: Account, companies: Entity[] }) => ({
        account: res.account,
        entities: res.companies,
      })));
  }

  public getEntities(accountId): Observable<{ companies: Entity[] }> {
    return this.http.get(
      `${
        GateApiService.GET_ENTITIES_API
        }?all_companies=true&account_id=${accountId}`
    ) as Observable<{ companies: Entity[] }>;
  }

  /**
   * Used for detect if enable Compliance assurance section
   * @param accountId
   */
  public getMatchedInvoices(accountId) {
    const httpParams = new HttpParams().set('account_id', accountId.toString());
    return this.http.get(GateApiService.MATCHED_INVOICES_API, {
      params: httpParams
    });
  }
}
