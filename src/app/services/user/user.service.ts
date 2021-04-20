import {Injectable} from '@angular/core';
import {CookiesService} from '../cookies/cookies.service';
import {USER_DETAILS_COOKIE_NAME, User} from '../../models/user.model';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  public static VATBOX_SERVICE_NAME = 'login';
  public static LOGOUT_URL = `/api/capua/v1.0/authentication/logout`;

  public static LOGIN_URL = '/login/';

  constructor(
    private http: HttpClient,
    private cookies: CookiesService
  ) {}

  /**
   * Redirects to login page
   * @param window
   */
  public redirectToLoginPage(): void {
    window.location.assign(UserService.LOGIN_URL + '?returnTo=' + window.location.search + window.location.hash ); // redirect to login app
  }

  /**
   * Performs logout request
   * and redirects to login page
   * @param window
   */
  public logout() {
    this.http.post(UserService.LOGOUT_URL, {})
      .subscribe(() => {
          this.redirectToLoginPage();
        },
        err => {
          console.error('logout failed:', err);
          this.redirectToLoginPage();
        });
  }

  public userDetails(): User {
    const cookie = this.cookies.getCookie(USER_DETAILS_COOKIE_NAME);
    if (cookie) {
      return JSON.parse(atob(cookie)); // decode the user data of ng.user.data cookie
    }
    return;
  }
}
