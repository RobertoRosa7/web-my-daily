import { Injectable, inject } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { DialogAlert } from '../../../interface/dialogs.interface';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private scrollStrategy = inject(ScrollStrategyOptions);
  public dialogConfig(data: DialogAlert): MatDialogConfig<DialogAlert> {
    return {
      panelClass: 'dialog-custom',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '450px',
      maxHeight: '220px',
      data: {
        title: data.title,
        message: data.message,
        actions: {
          messageAction: data.actions.messageAction,
          messageClose: data.actions.messageClose,
        },
      },
    };
  }
}
