import {User} from '~/models/user.model';
import {Conf, Currency} from '~/services/configuration/configuration.model';
import {Account, AccountStyleSetting, Entity} from '~/models/account.model';

export interface Store {
  user: User;
  configuration?: Conf;
  // Selected Account
  account?: Account;
  activeAccounts?: Account[];
  accountStyleSetting?: AccountStyleSetting;
  // Selected Currency
  currency?: Currency;
  entities?: Entity[];
  // Exists for Vatbox Users Only
  accounts?: Account[];
  isDemoAccount: boolean;
  isInitializing: boolean;
  // rate?: number;
  // userPermissions?: Permission[];
  // router?: string;
}

export interface SimpleAction {
  action: string;
  payload: Store;
}


