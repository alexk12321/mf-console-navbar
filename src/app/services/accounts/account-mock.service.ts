import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from "~/models/account.model";


@Injectable()
export class AccountMockService {
  constructor() {}

  public getAllAccounts(): Observable<Account[]> {
    return of([{id: 1, name: 'TEST', status: 'active'}]);
  }
}
