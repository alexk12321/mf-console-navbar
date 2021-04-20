import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogContainerComponent } from '../container/dialog-container.component';
import { DialogStyleClass } from '../dialog.model';

@Component({
  selector: 'info-dialog',
  template: `<dialog-container [title]="title" [message]="message" [typeClass]="dialogStyleClass">
                 <button mat-button color="primary" [mat-dialog-close]="true" tabindex="1">{{ buttonName }}</button>
               </dialog-container>`,
})
export class InfoDialogComponent extends DialogContainerComponent {
  public buttonName = 'Ok';
  public dialogStyleClass: DialogStyleClass = DialogStyleClass.success;

  constructor(public dialog: MatDialogRef<DialogContainerComponent>) {
    super();
  }
}
