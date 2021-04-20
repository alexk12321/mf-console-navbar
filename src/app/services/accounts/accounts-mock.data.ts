import { Account } from '~/models/account.model';
import {DEFAULT_ACCOUNT_ID} from "~/models/app-config.model";

export const getMockVatBoxAccounts: () => Account[] = () => {
  return [
    { id: DEFAULT_ACCOUNT_ID, name: 'Eli Lilly', status: 'active'  },
    { id: 22222, name: 'Amazon', status: 'active' },
    { id: 33333, name: 'Nike', status: 'active'  },
    { id: 5044, name: 'Pwc', status: 'inactive'  },
  ];
};
