import {CookiesService} from "~/services/cookies/cookies.service";
import {USER_DETAILS_COOKIE_NAME} from "~/models/user.model";
import {Injectable} from "@angular/core";

export interface UserServiceConfiguration {
  vatboxUserId: string;
  vatboxUserEmail: string;
}

@Injectable()
export class UserMockService {
  public static readonly userServiceConfiguration: UserServiceConfiguration = {
    vatboxUserId: '123',
    vatboxUserEmail: 'denisamazon@lol.com',
  };

  constructor(private cookies: CookiesService) {}

  public setMockUserCookies(): void {
    this.cookies.setCookie(
      USER_DETAILS_COOKIE_NAME,
      btoa(
        JSON.stringify({
          id: UserMockService.userServiceConfiguration.vatboxUserId,
          email: UserMockService.userServiceConfiguration.vatboxUserEmail,
        }),
      ),
      999,
    );
  }
}
