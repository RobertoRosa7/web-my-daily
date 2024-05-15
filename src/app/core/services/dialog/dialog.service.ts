import { Injectable, inject } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { DialogAlert } from '../../../interface/dialogs.interface';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { FollowRequest } from '../../../interface/follow.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private scrollStrategy = inject(ScrollStrategyOptions);
  public get dialogConfig(): MatDialogConfig<DialogAlert> {
    return {
      panelClass: 'dialog-custom',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '450px',
      maxHeight: '220px',
      data: {
        title: 'Você não fez login ainda',
        message: 'Para poder continuar precisa fazer login',
        actions: {
          messageAction: 'Fazer login',
          messageClose: 'Fechar',
        },
      },
    };
  }

  public buildFollowRequest(followId: string | undefined, userId: string): FollowRequest {
    return {
      ev: 'dispatch_following',
      followId,
      userId,
    };
  }
}
