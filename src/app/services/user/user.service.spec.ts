import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import {CookiesService} from '../cookies/cookies.service';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {USER_DETAILS_COOKIE_NAME} from "~/models/user.model";

const mockWindow: any = (() => {
  const windowObject = {
    path: '',
    // now, $window.location.path will update that empty object
    location: {
      assign: (locationPath): void => {
        windowObject.path = locationPath
      },
    },
    // we keep the reference to window.document
    document: window.document,
  };
  return windowObject;
})();

describe('UserService', () => {
  let cookieService: CookiesService;
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, CookiesService],
    });
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    cookieService = TestBed.inject(CookiesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('redirectToLoginPage', () => {
    it('should redirect to login page',  async () => {
      userService.redirectToLoginPage(mockWindow);
      expect(mockWindow.path).toBe('/login/');
    });
  });

  describe('logout', () => {
    it('should call logout from server in the api',
      inject([HttpTestingController, UserService],(
        httpMock: HttpTestingController, service: UserService
      ) => {
        userService.logout(mockWindow);
        const req = httpMock.expectOne("/api/login/v2.0/logout");
        req.flush({});

        expect(req.request.method).toEqual('PUT');

        expect(mockWindow.path).toBe('/login/');
      }))
  });

  describe('get UserDetails', () => {
    it('should fetch user details from cookie', () => {
      const userDetails = { id: '123', email: 'erez@vatbox.com' };

      cookieService.setCookie(USER_DETAILS_COOKIE_NAME, btoa(JSON.stringify(userDetails)), 1);

      expect(userService.userDetails()).toEqual(userDetails);
    });
  });
});
