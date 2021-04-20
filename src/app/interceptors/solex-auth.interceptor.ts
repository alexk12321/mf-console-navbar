import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class SolexAuthInterceptor implements HttpInterceptor {

  private LOGOUT_URL = `/api/capua/v1.0/authentication/logout`;
  private LOGIN_URL = '/login/';

  constructor(
    private http: HttpClient,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event) => event,
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.logout();
            }
          }
        }
      )
    )
  }

  private logout(browserWindow: Partial<Window> = window) {
    this.http.post(this.LOGOUT_URL, {})
      .subscribe(() => {
          this.redirectToLoginPage(browserWindow);
        },
        err => {
          console.error('logout failed:', err);
          this.redirectToLoginPage(browserWindow);
        });
  }

  public redirectToLoginPage(browserWindow: Partial<Window> = window): void {
    browserWindow.location.assign(this.LOGIN_URL);
  }
}
