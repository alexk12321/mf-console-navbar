export interface Account {
  id: number;
  name: string;
  features?: string[];
  status: string;
  isTestAccount?: boolean;
  tier?: number | 0;
  sfId?: string;
}

export interface Entity {
  id: number;
  name: string;
  country?: string;
  status?: EntityStatus;
}

export enum EntityStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending'
}


export interface AccountNames {
  [accountId: string]: string;
}

export interface AccountStyleSetting {
  navbarColor?: string;
  chartTheme?: string;
  logoUrl?: string;
}

export interface AccountFeature {
  id: number;
  accountId: number;
  featureId: string;
  timeFrame: {
    start?: string;
    end?: string;
  };
}

