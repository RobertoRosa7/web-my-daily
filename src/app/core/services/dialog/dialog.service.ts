import { Injectable, inject } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { DialogAlert, dialogData } from '../../../interface/dialogs.interface';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ProfileHappen } from '../../../pages/profile/core/interfaces/profile.happen.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private scrollStrategy = inject(ScrollStrategyOptions);

  public dialogConfigHappen(data: dialogData<ProfileHappen>) {
    return {
      panelClass: 'dialog-custom',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '920px',
      maxHeight: '600px',
      data,
    };
  }

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
