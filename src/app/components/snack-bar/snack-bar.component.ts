import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  template: `
      <div class="{{ data.snackType ? 'snackbar-message' : ''}}" fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="20px">
          <mat-icon *ngIf="data.snackType" class="snackbar-icon-status">{{icon}}</mat-icon>
          <div [innerHTML]="data.html"></div>
          <button mat-button (click)="snackBar.dismiss()" color="warn">{{data.buttonMessage}}</button>
      </div>
  `,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBar: MatSnackBar) {
  }
  get icon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'check_circle_outline';
      case 'Error':
        return 'error';
      case 'Warn':
        return 'warning';
      case 'Info':
        return 'info';
    }
  }
}
