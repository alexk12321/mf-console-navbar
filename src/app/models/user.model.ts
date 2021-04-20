

export const USER_DETAILS_COOKIE_NAME = 'ng.user.data';

export interface User {
  id?: string;
  email: string;
  name: string;
  position: string;
  accounts: Account[];
  accesses: {
    id: number;
    type: string;
  }[];
  preferences?: {currency?: string};
  roles: any[];
  isAdmin: boolean;
}
