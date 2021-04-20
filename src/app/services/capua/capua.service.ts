import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CapuaService {

  public static VATBOX_SERVICE_NAME = "capua";

  public static PERMISSIONS_API = `/api/${
    CapuaService.VATBOX_SERVICE_NAME
  }/v1.0/users/me`;
  public static PREFERENCES_API = `${CapuaService.PERMISSIONS_API}/preferences`;

  constructor(
    private http: HttpClient,
  ) { }

  public getUserDetails() {
    return this.http.get(CapuaService.PERMISSIONS_API).pipe(map((i: { user: any }) => i.user));
  }

  /**
   * set User Currency
   * */
  public setUserCurrency(code: string): Observable<any> {
    return this.http.post<any>(
      CapuaService.PREFERENCES_API,
      {currency: code}
    );
  }
}
