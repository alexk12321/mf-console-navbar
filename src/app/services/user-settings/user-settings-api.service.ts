import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";

import {UserSettings} from "~/models/user-settings.model";
import {User} from "~/models/user.model";

@Injectable()
export class UserSettingsApiService {

  public static VATBOX_SERVICE_NAME = 'dashboard';
  public static API_BASE = `/api/${UserSettingsApiService.VATBOX_SERVICE_NAME}/v1.0`;
  public static DASHBOARD_USER_SETTINGS = `${UserSettingsApiService.API_BASE}/user_settings`;

  constructor(private http: HttpClient) {}

  /**
   * Get UserSettings from Dashboard
   * */
  public getUserSettings(): Observable<UserSettings> {
    return of({}) as Observable<UserSettings>;
    // return this.http.get<UserSettings>(
    //   UserSettingsApiService.DASHBOARD_USER_SETTINGS,
    // );
  }

  /**
   * Save UserSettings to Dashboard
   * */
  public saveUserSettings(userSettings: UserSettings): Observable<UserSettings> {
    return this.http.post<UserSettings>(
      UserSettingsApiService.DASHBOARD_USER_SETTINGS,
      userSettings,
    );
  }
}
