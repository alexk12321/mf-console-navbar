import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '~/components/dialog/types/confirm-dialog.component';
import { DialogStyleClass } from '~/components/dialog/dialog.model';
import { CapuaService } from "~/services/capua/capua.service";


@Injectable()
export class UserSettingsService {

  constructor(
    private api: CapuaService,
    private dialog: MatDialog,
  ) {
  }

  /**
   * Subscribe to the API service function that saves user settings
   * */
  public subscribeToSaveUserSettings(currencyCode: string): Subscription {
    return this.api.setUserCurrency(currencyCode).pipe(take(1)).subscribe();
  }

  /*
  * Open a modal to ask the user if they want the selected currency to be saved
  * as their default currency
  * */
  public saveDefaultCurrency(currency) {
    this.subscribeToSaveUserSettings(currency.code);
    // confirmation dialog
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   restoreFocus: false,
    // });
    // dialogRef.componentInstance.message = `Do you want to set ${currency.name} as a default?`;
    // dialogRef.componentInstance.dialogStyleClass = DialogStyleClass.info;
    // dialogRef.componentInstance.approveButtonName = 'YES';
    // dialogRef.afterClosed().pipe(take(1)).subscribe((isConfirmed: boolean) => {
    //   if (isConfirmed) {
    //     this.subscribeToSaveUserSettings(currency.code);
    //   }
    // });
  }
}
