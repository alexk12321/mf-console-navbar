import { Component, Input } from '@angular/core';
import { DialogStyleClass } from '../dialog.model';

@Component({
  selector: 'dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
})
export class DialogContainerComponent {
  @Input()
  public title: string;
  @Input()
  public message: string;
  @Input()
  public typeClass: DialogStyleClass;

  public buttonName?: string;

  public getDialogClass(): string {
    return DialogStyleClass[this.typeClass];
  }
}
